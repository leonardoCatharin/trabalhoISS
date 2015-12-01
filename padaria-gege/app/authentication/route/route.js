'use strict';

let Controller = require('../controller/controller');

module.exports = (app) => {

  let url = '/authenticate';

  app.post(url, Controller.authenticate);
  app.use(Controller.validateToken)

}
