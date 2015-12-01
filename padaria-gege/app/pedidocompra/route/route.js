'use strict';

let Controller = require('../controller/controller');

module.exports = (app) => {

  let url = '/api/pedidocompra';

  app.get(url, Controller.getpedidoCompra);

  app.get(`${url}/:uid`, Controller.getpedidoCompraById);

  app.put(`${url}/:uid`, Controller.updatepedidoCompra);

  app.post(url, Controller.savepedidoCompra);

  app.delete(`${url}/:uid`, Controller.deletepedidoCompra);

}
