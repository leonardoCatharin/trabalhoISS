'use strict';
let Service = require('../service/service');

module.exports = {
  getordemProducao,
  getordemProducaoById,
  updateordemProducao,
  saveordemProducao,
  deleteordemProducao
}

function getordemProducao(req,res){
  Service.get(req.page, req.limit, (err, data) => {
    if(err) res.status(500).send(err);
    res.json(data);
  });
}

function getordemProducaoById(req,res){
  Service.getId(req.params.uid, (err, data) => {
    if(err) res.status(404).send(err);
    res.json(data);
  })
}

function updateordemProducao(req,res){
  Service.update(req.body, (err,data) => {
    if(err) res.status(404).send(err);
    res.json(err);
  });
}

function saveordemProducao(req,res){
  Service.save(req.body, (err,data) => {
    if(err) res.status(422).send(err.errors);
    res.json(data);
  });
}

function deleteordemProducao(req,res){
  Service.remove(req.params.uid, (err, data) => {
      if(err) res.status(500).send(err);
      res.json(data);
  });
}

