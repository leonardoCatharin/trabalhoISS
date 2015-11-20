'use strict';

let Controller = require('../controller/controller');

module.exports = (app) => {

  let url = '/api/ordemproducao';

  app.get(url, Controller.getordemProducao);

  app.get(`${url}/:uid`, Controller.getordemProducaoById);

  app.put(`${url}/:uid`, Controller.updateordemProducao);

  app.post(url, Controller.saveordemProducao);

  app.delete(`${url}/:uid`, Controller.deleteordemProducao);

}
