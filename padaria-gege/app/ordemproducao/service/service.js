'use strict';
let ordemProducao = require('../model/model');

module.exports = new Service();

function Service(){
};

Service.prototype.save = function(value, cb){
  let newordemProducao = new ordemProducao(value);
  ordemProducao.create(newordemProducao, cb)
}

Service.prototype.get = function(page,limit, cb){
  page = page || 1;
  limit = limit || 10;
  ordemProducao.paginate({}, {
    page,
    limit
  },cb);
}

Service.prototype.getId = function(id,cb){
  ordemProducao.findById(id, cb);
}

Service.prototype.remove = function(_id,cb){
  ordemProducao
    .find({_id})
    .remove(cb);
}

Service.prototype.update = function(obj, cb){
  ordemProducao.findOneAndUpdate(obj._id, obj, {
    new: true
  },cb)
}
