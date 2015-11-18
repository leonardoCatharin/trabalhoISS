'use strict';
let pedidoCompra = require('../model/model');

module.exports = new Service();

function Service(){
};

Service.prototype.save = function(value, cb){
  let newpedidoCompra = new pedidoCompra(value);
  pedidoCompra.create(newpedidoCompra, cb)
}

Service.prototype.get = function(page,limit, cb){
  page = page || 1;
  limit = limit || 10;
  pedidoCompra.paginate({}, {
    page,
    limit
  },cb);
}

Service.prototype.getId = function(id,cb){
  pedidoCompra.findById(id, cb);
}

Service.prototype.remove = function(_id,cb){
  pedidoCompra
    .find({_id})
    .remove(cb);
}

Service.prototype.update = function(obj, cb){
  pedidoCompra.findOneAndUpdate(obj._id, obj, {
    new: true
  },cb)
}
