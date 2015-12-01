'use strict';
let Encomenda = require('../model/model'),
    OrdemProducaoService = require('../../ordemproducao/service/service');

module.exports = new Service();

function Service(){}

Service.prototype.save = function(value, cb){

  let ordemProducao = {
    itemProducaoLista:value.produtos
    ,dataPrazo:value.dataEntrega
    ,tipoOrdem:'ENCOMENDA'
  };

  OrdemProducaoService.save(ordemProducao,(err,data)=>{
    value.ordemProducao = data;
    let newEncomenda = new Encomenda(value);
    Encomenda.create(newEncomenda, cb);
  })

};

Service.prototype.get = function(page,limit, cb){
  page = page || 1;
  limit = limit || 10;
  Encomenda.paginate({}, { page,  limit},cb);
};

Service.prototype.getId = function(id,cb){
  Encomenda.findById(id).populate('ordemProducao').populate('ordemProducao.itemProducaoLista').exec(cb);
}

Service.prototype.remove = function(_id,cb){
  Encomenda
    .find({_id})
    .remove(cb);
}

Service.prototype.update = function(obj, cb){
  Encomenda.findOneAndUpdate(obj._id, obj, {
    new: true
  },cb)
}
