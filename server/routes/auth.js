import HttpStatus from "http-status";
import jwt from "jwt-simple";
import Config from "../config/config";

export default (app, user) => {
  const config = Config;
  const Users = user;

  app.post("/token", (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;

      Users.findOne({ where: { email } })
        .then(user => {
          if (Users.isPassword(user.password, password)) {
            const payload = { id: user.id };
            res.json({ token: jwt.encode(payload, config.jwtSecret) });
          } else {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
          }
        })
        .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED));
    } else {
      res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
  });
};
