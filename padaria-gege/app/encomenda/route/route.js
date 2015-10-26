'use strict';

let Controller = require('../controller/controller');

module.exports = (app) => {

  let url = '/api/encomenda';

  app.get(url, Controller.getEncomenda);

  app.get(`${url}/:uid`, Controller.getEncomendaById);

  app.put(`${url}/:uid`, Controller.updateEncomenda);

  app.post(url, Controller.saveEncomenda);

  app.delete(`${url}/:uid`, Controller.deleteEncomenda);

}
