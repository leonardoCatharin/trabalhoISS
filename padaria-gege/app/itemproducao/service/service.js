'use strict';
let ItemProducao = require('../model/model');

module.exports = new Service();

function Service(){};

Service.prototype.save = function(value, cb){
  let newItensProducao = value.map((data)=>{
    return new ItemProducao(data);
  });
  ItemProducao.create(newItensProducao, cb)
};

Service.prototype.remove = function(_id,cb){
  ItemProducao
    .find({_id})
    .remove(cb);
};

