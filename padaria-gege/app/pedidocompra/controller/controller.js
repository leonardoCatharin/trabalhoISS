'use strict';
let Service = require('../service/service');

module.exports = {
  getpedidoCompra,
  getpedidoCompraById,
  updatepedidoCompra,
  savepedidoCompra,
  deletepedidoCompra
}

function getpedidoCompra(req,res){
  Service.get(req.page, req.limit, (err, data) => {
    if(err) res.status(500).send(err);
    res.json(data);
  });
}

function getpedidoCompraById(req,res){
  Service.getId(req.params.uid, (err, data) => {
    if(err) res.status(404).send(err);
    res.json(data);
  })
}

function updatepedidoCompra(req,res){
  Service.update(req.body, (err,data) => {
    if(err) res.status(404).send(err);
    res.json(err);
  });
}

function savepedidoCompra(req,res){
  Service.save(req.body, (err,data) => {
    if(err) res.status(422).send(err.errors);
    res.json(data);
  });
}

function deletepedidoCompra(req,res){
  Service.remove(req.params.uid, (err, data) => {
      if(err) res.status(500).send(err);
      res.json(data);
  });
}

