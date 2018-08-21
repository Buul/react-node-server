import supertest from "supertest";
import chai from "chai";
import jwt from "jwt-simple";
import Joi from "joi";
import joiAssert from "joi-assert";
import app from "../../app";
import config from "../../config/config";
import datasource from "../../config/datasource";

const request = supertest(app);
const datasourceApp = datasource();

describe("Routes transactions", () => {
  const transactions = datasourceApp.models.Transactions;
  const users = datasourceApp.models.Users;

  const defaultTransaction = {
    idTransacao: 1,
    cartao: 5544776688776655,
    valor: 22.2,
    data: "01/01/2018"
  };
  const defaultUser = {
    name: "paulo",
    email: "paulo@mail.com",
    password: "root"
  };

  let token;

  beforeEach(done => {
    users
      .destroy({ where: {} })
      .then(() => users.create(defaultUser))
      .then(user => {
        transactions
          .destroy({ where: {} })
          .then(() => transactions.create(defaultTransaction))
          .then(() => {
            token = jwt.encode({ id: user.id }, config.jwtSecret);
            done();
          });
      });
  });

  describe("Route GET /transactions", () => {
    it("should return a list of transactions", done => {
      const transactionsList = Joi.array().items(
        Joi.object().keys({
          idTransacao: Joi.number(),
          cartao: Joi.number(),
          valor: Joi.number().precision(11),
          data: Joi.string(),
          created_at: Joi.date().iso(),
          updated_at: Joi.date().iso()
        })
      );

      request
        .get("/transactions")
        .set("Authorization", `bearer ${token}`)
        .end((err, res) => {
          joiAssert(res.body, transactionsList);
          done(err);
        });
    });
  });

  describe("Route GET /transactions/{id}", () => {
    it("should return a transaction", done => {
      const transaction = Joi.object().keys({
        idTransacao: Joi.number(),
        cartao: Joi.number(),
        valor: Joi.number().precision(11),
        data: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso()
      });

      request
        .get("/transactions/1")
        .set("Authorization", `bearer ${token}`)
        .end((err, res) => {
          joiAssert(res.body, transaction);
          done(err);
        });
    });
  });

  describe("Route POST /transactions", () => {
    it("should create a transaction", done => {
      const transaction = Joi.object().keys({
        idTransacao: Joi.number(),
        cartao: Joi.number(),
        valor: Joi.number().precision(11),
        data: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso()
      });

      const newTransaction = {
        idTransacao: 2,
        cartao: 44556688774155,
        valor: 10.2,
        data: "02/02/2018"
      };
      request
        .post("/transactions")
        .set("Authorization", `bearer ${token}`)
        .send(newTransaction)
        .end((err, res) => {
          joiAssert(res.body, transaction);
          done(err);
        });
    });
  });

  describe("Route PUT /transactions/{id}", () => {
    it("should update a transaction", done => {
      const updatedTransaction = {
        idTransacao: 1,
        cartao: 4455668,
        valor: 10.2,
        data: "02/02/2018"
      };

      const updatedCount = Joi.array().items(1);
      request
        .put("/transactions/1")
        .set("Authorization", `bearer ${token}`)
        .send(updatedTransaction)
        .end((err, res) => {
          joiAssert(res.body, updatedCount);
          done(err);
        });
    });
  });

  describe("Route DELETE /transactions/{id}", () => {
    it("should delete a transaction", done => {
      request
        .delete("/transactions/1")
        .set("Authorization", `bearer ${token}`)
        .end((err, res) => {
          chai.expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
