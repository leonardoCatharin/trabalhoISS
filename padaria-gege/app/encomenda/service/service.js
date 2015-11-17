'use strict';
let Encomenda = require('../model/model');

module.exports = new Service();

function Service(){
};

Service.prototype.save = function(value, cb){
  let newEncomenda = new Encomenda(value);
  Encomenda.create(newEncomenda, cb)
}

Service.prototype.get = function(page,limit, cb){
  page = page || 1;
  limit = limit || 10;
  Encomenda.paginate({}, {
    page,
    limit
  },cb);
}

Service.prototype.getId = function(id,cb){
  Encomenda.findById(id, cb);
}

Service.prototype.remove = function(_id,cb){
  Encomenda
    .find({_id})
    .remove(cb);
}

Service.prototype.update = function(obj, cb){
  console.log(obj._id);
  Encomenda.findOneAndUpdate(obj._id, obj, {
    new: false
  },cb)
}
