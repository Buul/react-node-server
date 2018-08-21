import supertest from "supertest";
import chai from "chai";
import jwt from "jwt-simple";
import app from "../../../app";
import datasource from "../../../config/datasource";
import config from "../../../config/config";
const request = supertest(app);
const datasourceApp = datasource();

describe("Routes users", () => {
  const users = datasourceApp.models.Users;

  const defaultUser = {
    id: 1,
    name: "teste default",
    email: "paulo2@mail.com",
    password: "root2"
  };

  const defaultUserAuth = {
    name: "paulo",
    email: "paulo@mail.com",
    password: "root"
  };

  let token;

  beforeEach(done => {
    users
      .destroy({ where: {} })
      .then(() => users.create(defaultUserAuth))
      .then(user => {
        users.create(defaultUser).then(() => {
          token = jwt.encode({ id: user.id }, config.jwtSecret);
          done();
        });
      });
  });

  describe("Route GET /users", () => {
    it("should return a list of users", done => {
      request
        .get("/users")
        .set("Authorization", `bearer ${token}`)
        .end((err, res) => {
          chai.expect(res.body[0].id).to.be.eql(defaultUser.id);
          chai.expect(res.body[0].nome).to.be.eql(defaultUser.nome);
          chai.expect(res.body[0].email).to.be.eql(defaultUser.email);
          done(err);
        });
    });
  });

  describe("Route GET /users/{id}", () => {
    it("should return a user", done => {
      request
        .get("/users/1")
        .set("Authorization", `bearer ${token}`)
        .end((err, res) => {
          chai.expect(res.body.id).to.be.eql(defaultUser.id);
          chai.expect(res.body.nome).to.be.eql(defaultUser.nome);
          chai.expect(res.body.email).to.be.eql(defaultUser.email);
          done(err);
        });
    });
  });

  describe("Route POST /users", () => {
    it("should create a user", done => {
      const newUser = {
        id: 2,
        name: "New User",
        email: "email@mail.com",
        password: "root"
      };
      request
        .post("/users")
        .set("Authorization", `bearer ${token}`)
        .send(newUser)
        .end((err, res) => {
          chai.expect(res.body.id).to.be.eql(newUser.id);
          chai.expect(res.body.nome).to.be.eql(newUser.nome);
          chai.expect(res.body.email).to.be.eql(newUser.email);
          done(err);
        });
    });
  });

  describe("Route PUT /users/{id}", () => {
    it("should update a user", done => {
      const updatedUser = {
        id: 1,
        name: "Update User",
        email: "email@mail.com",
        password: "root"
      };
      request
        .put("/users/1")
        .set("Authorization", `bearer ${token}`)
        .send(updatedUser)
        .end((err, res) => {
          chai.expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe("Route DELETE /users/{id}", () => {
    it("should delete a user", done => {
      request
        .delete("/users/1")
        .set("Authorization", `bearer ${token}`)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
