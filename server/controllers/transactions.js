import HttpStatus from "http-status";
const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode
});

const errorResponse = (message, statusCode = HttpStatus.BAD_GATEWAY) =>
  defaultResponse({ error: message }, statusCode);

class transactionsController {
  constructor(Transactions) {
    this.Transactions = Transactions;
  }

  getAll() {
    return this.Transactions.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Transactions.findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Transactions.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error =>
        errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
      );
  }

  update(data, params) {
    return this.Transactions.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(error =>
        errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
      );
  }

  delete(params) {
    return this.Transactions.destroy({ where: params })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error =>
        errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
      );
  }
}

export default transactionsController;
