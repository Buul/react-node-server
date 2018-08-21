import UsersController from "../controllers/users";

export default (app, users, auth) => {
  const usersController = new UsersController(users);
  app
    .route("/users")
    .all(auth.authenticate())
    .get((_req, res) => {
      usersController.getAll().then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .post((req, res) => {
      usersController.create(req.body).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    });
  app
    .route("/users/:id")
    .all(auth.authenticate())
    .get((req, res) => {
      usersController.getById(req.params).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .put((req, res) => {
      usersController.update(req.body, req.params).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .delete((req, res) => {
      usersController.delete(req.params).then(response => {
        res.sendStatus(response.statusCode);
      });
    });
};
