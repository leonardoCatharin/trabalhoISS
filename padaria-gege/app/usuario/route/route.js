'use strict';

let Controller = require('../controller/controller');

module.exports = (app) => {

  let url = '/api/usuario';

  app.get(url, Controller.getUsuario);

  app.get(`${url}/:uid`, Controller.getUsuarioById);

  app.put(`${url}/:uid`, Controller.updateUsuario);

  app.post(url, Controller.saveUsuario);

  app.delete(`${url}/:uid`, Controller.deleteUsuario);

}
