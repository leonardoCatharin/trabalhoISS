
'use strict';
let Fornecedor = require('../model/model');

module.exports = new Service();

function Service(){};

Service.prototype.get = function(callback){
  Fornecedor
  .find({})
  .exec(callback);
}

Service.prototype.getId = function(id,callback){
  Fornecedor
    .findById(id)
    .exec(callback);
}

Service.prototype.getByName = function(query, cb){
  Fornecedor.find({query},cb);
}

Service.prototype.remove = function(_id,cb){
  Fornecedor
    .find({_id})
    .remove(cb);
}

Service.prototype.save = function(value,cb){
  Fornecedor.create(new Fornecedor(value), cb);
}

Service.prototype.update = function(obj, callback){
  Fornecedor.findOneAndUpdate(obj._id, obj, {
    new: true
  })
  .exec(callback)
}
