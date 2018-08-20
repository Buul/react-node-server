import TransactionsController from "../controllers/transactions";

export default (app, transactions) => {
  const transactionsController = new TransactionsController(transactions);
  app
    .route("/transactions")
    .get((_req, res) => {
      transactionsController.getAll().then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .post((req, res) => {
      transactionsController.create(req.body).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    });
  app
    .route("/transactions/:id")
    .get((req, res) => {
      transactionsController
        .getById({ idTransacao: req.params.id })
        .then(response => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      transactionsController
        .update(req.body, { idTransacao: req.params.id })
        .then(response => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      transactionsController
        .delete({ idTransacao: req.params.id })
        .then(response => {
          res.sendStatus(response.statusCode);
        });
    });
};
