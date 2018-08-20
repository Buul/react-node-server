const defaultResponse = (data, statusCode = 200) => ({ data, statusCode });

const errorResponse = (message, statusCode = 400) =>
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
      .then(result => defaultResponse(result, 201))
      .catch(error => errorResponse(error.message, 422));
  }

  update(data, params) {
    return this.Transactions.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, 422));
  }

  delete(params) {
    return this.Transactions.destroy({ where: params })
      .then(result => defaultResponse(result, 204))
      .catch(error => errorResponse(error.message, 422));
  }
}

export default transactionsController;
