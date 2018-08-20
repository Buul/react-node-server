import td from "testdouble";
import chai from "chai";
import TransactionsController from "../../../controllers/transactions";
describe("Controllers: Transactions", () => {
  describe("Get all transactions: getAll()", () => {
    it("should return a list of transactions", () => {
      const transactions = { findAll: td.function() };

      const expectedResponse = [
        {
          idTransacao: 1,
          cartao: 5544776688776655,
          valor: 22.2,
          data: "01/01/2018",
          created_at: "2016-08-06T23:55:36.692Z",
          updated_at: "2016-08-06T23:55:36.692Z"
        }
      ];

      td.when(transactions.findAll({})).thenResolve(expectedResponse);

      const transactionsController = new TransactionsController(transactions);
      return transactionsController
        .getAll()
        .then(response =>
          chai.expect(response.data).to.be.eql(expectedResponse)
        );
    });
  });

  describe("Get a transaction: getById()", () => {
    it("should return a transaction", () => {
      const transactions = { findOne: td.function() };

      const expectedResponse = [
        {
          idTransacao: 1,
          cartao: 5544776688776655,
          valor: 22.2,
          data: "01/01/2018",
          created_at: "2016-08-06T23:55:36.692Z",
          updated_at: "2016-08-06T23:55:36.692Z"
        }
      ];

      td.when(transactions.findOne({ where: { idTransacao: 1 } })).thenResolve(
        expectedResponse
      );

      const transactionsController = new TransactionsController(transactions);
      return transactionsController
        .getById({ idTransacao: 1 })
        .then(response =>
          chai.expect(response.data).to.be.eql(expectedResponse)
        );
    });
  });

  describe("Create a transaction: create()", () => {
    it("should create a transaction", () => {
      const transactions = { create: td.function() };

      const requestBody = {
        cartao: 5544776688776655,
        valor: 10.2,
        data: "02/02/2018"
      };
      const expectedResponse = [
        {
          idTransacao: 1,
          cartao: 5544776688776655,
          valor: 10.2,
          data: "02/02/2018",
          created_at: "2016-08-06T23:55:36.692Z",
          updated_at: "2016-08-06T23:55:36.692Z"
        }
      ];

      td.when(transactions.create(requestBody)).thenResolve(expectedResponse);

      const transactionsController = new TransactionsController(transactions);
      return transactionsController.create(requestBody).then(response => {
        chai.expect(response.statusCode).to.be.eql(201);
        chai.expect(response.data).to.be.eql(expectedResponse);
      });
    });
  });

  describe("Update a transaction: update()", () => {
    it("should update an existing transaction", () => {
      const transactions = { update: td.function() };

      const requestBody = {
        idTransacao: 1,
        cartao: 11111111111111111,
        valor: 10.2,
        data: "02/02/2018"
      };
      const expectedResponse = [
        {
          idTransacao: 1,
          cartao: 11111111111111111,
          valor: 10.2,
          data: "02/02/2018",
          created_at: "2016-08-06T23:55:36.692Z",
          updated_at: "2016-08-06T23:55:36.692Z"
        }
      ];

      td.when(
        transactions.update(requestBody, { where: { idTransacao: 1 } })
      ).thenResolve(expectedResponse);

      const transactionsController = new TransactionsController(transactions);
      return transactionsController
        .update(requestBody, { idTransacao: 1 })
        .then(response => {
          chai.expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe("Delete a transaction: delete()", () => {
    it("should delete an existing transaction", () => {
      const transactions = { destroy: td.function() };

      td.when(transactions.destroy({ where: { idTransacao: 1 } })).thenResolve(
        {}
      );

      const transactionsController = new TransactionsController(transactions);
      return transactionsController
        .delete({ idTransacao: 1 })
        .then(response => {
          chai.expect(response.statusCode).to.be.eql(204);
        });
    });
  });
});
