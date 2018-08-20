import supertest from "supertest";
import chai from "chai";
import app from "../../app";
import datasource from "../../config/datasource";
const request = supertest(app);
const datasourceApp = datasource();

describe("Routes transactions", () => {
  const transactions = datasourceApp.models.Transactions,
    defaultTransaction = {
      idTransacao: 1,
      cartao: 5544776688776655,
      valor: 22.2,
      data: "01/01/2018"
    };

  beforeEach(done => {
    transactions
      .destroy({ where: {} })
      .then(() => transactions.create(defaultTransaction))
      .then(() => {
        done();
      });
  });

  describe("Route GET /transactions", () => {
    it("should return a list of transactions", done => {
      request.get("/transactions").end((err, res) => {
        chai
          .expect(res.body[0].idTransacao)
          .to.be.eql(defaultTransaction.idTransacao);
        chai.expect(res.body[0].cartao).to.be.eql(defaultTransaction.cartao);
        chai.expect(res.body[0].valor).to.be.eql(defaultTransaction.valor);
        chai.expect(res.body[0].data).to.be.eql(defaultTransaction.data);
        done(err);
      });
    });
  });

  describe("Route GET /transactions/{id}", () => {
    it("should return a transaction", done => {
      request.get("/transactions/1").end((err, res) => {
        chai
          .expect(res.body.idTransacao)
          .to.be.eql(defaultTransaction.idTransacao);
        chai.expect(res.body.cartao).to.be.eql(defaultTransaction.cartao);
        chai.expect(res.body.valor).to.be.eql(defaultTransaction.valor);
        chai.expect(res.body.data).to.be.eql(defaultTransaction.data);
        done(err);
      });
    });
  });

  describe("Route POST /transactions", () => {
    it("should create a transaction", done => {
      const newTransaction = {
        idTransacao: 2,
        cartao: 44556688774155,
        valor: 10.2,
        data: "02/02/2018"
      };
      request
        .post("/transactions")
        .send(newTransaction)
        .end((err, res) => {
          chai
            .expect(res.body.idTransacao)
            .to.be.eql(newTransaction.idTransacao);
          chai.expect(res.body.cartao).to.be.eql(newTransaction.cartao);
          chai.expect(res.body.valor).to.be.eql(newTransaction.valor);
          chai.expect(res.body.data).to.be.eql(newTransaction.data);
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
      request
        .put("/transactions/1")
        .send(updatedTransaction)
        .end((err, res) => {
          chai.expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe("Route DELETE /transactions/{id}", () => {
    it("should delete a transaction", done => {
      request.delete("/transactions/1").end((err, res) => {
        chai.expect(res.statusCode).to.be.eql(204);
        done(err);
      });
    });
  });
});
