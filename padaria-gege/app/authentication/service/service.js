'use strict';
let Usuario = require('../../usuario/model/model');

module.exports = new Service();

function Service(){
};

Service.prototype.authenticate = function(obj, cb){
  Usuario.findOne({login:obj.login},cb)
}
