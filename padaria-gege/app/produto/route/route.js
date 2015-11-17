'use strict';

let Controller = require('../controller/controller');

module.exports = (app) => {

  let url = '/api/produto';

  app.get(url, Controller.getProduct);
  
  app.get(`${url}/name`, Controller.getByName);

  app.get(`${url}/:uid`, Controller.getProductById);

  app.put(`${url}/:uid`, Controller.updateProduct);

  app.post(url, Controller.saveProduct);

  app.delete(`${url}/:uid`, Controller.deleteProduct);

}
