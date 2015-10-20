'use strict';
let Service = require('../service/service');

module.exports = {
  getProduct,
  getProductById,
  updateProduct,
  saveProduct,
  deleteProduct
}

function getProduct(req,res){
  Service.get(req.page, req.limit, (err, data) => {
    if(err) res.status(500).send(err);
    res.json(data);
  });
}

function getProductById(req,res){
  Service.getId(req.params.uid, (err, data) => {
    if(err) res.status(404).send(err);
    res.json(data);
  })
}

function updateProduct(req,res){
  Service.update(req.body, (err,data) => {
    if(err) res.status(404).send(err);
    res.json(data);
  });
}

function saveProduct(req,res){
  Service.save(req.body, (err,data) => {
    if(err) res.status(422).send(err.errors.type.properties.message);
    res.json(data);
  });
}

function deleteProduct(req,res){
  Service.remove(req.params.uid, (err, data) => {
      if(err) res.status(500).send(err);
      res.json(data);
  });
}