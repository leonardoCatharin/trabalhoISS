
'use strict';

let Controller = require('../controller/controller');

module.exports = (app) => {

  let url = '/api/fornecedor';

  app.get(url, Controller.getFornecedor);

  app.get(`${url}/name`, Controller.getFornecedorByName);

  app.get(url + '/:uid', Controller.getFornecedorById);

  app.put(url + '/:uid', Controller.updateFornecedor);

  app.post(url, Controller.saveFornecedor);

  app.delete(url + '/:uid', Controller.deleteFornecedor);

}
