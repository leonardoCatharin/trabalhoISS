'use strict';
let Service = require('../service/service');

module.exports = {
  getEncomenda,
  getEncomendaById,
  updateEncomenda,
  saveEncomenda,
  deleteEncomenda
}

function getEncomenda(req,res){
  Service.get(req.page, req.limit, (err, data) => {
    if(err) res.status(500).send(err);
    res.json(data);
  });
}

function getEncomendaById(req,res){
  Service.getId(req.params.uid, (err, data) => {
    if(err) res.status(404).send(err);
    res.json(data);
  })
}

function updateEncomenda(req,res){
  Service.update(req.body, (err,data) => {
    if(err) res.status(404).send(err);
    res.json(data);
  });
}

function saveEncomenda(req,res){
  Service.save(req.body, (err,data) => {
    if(err) res.status(422).send(err.errors.type.properties.message);
    res.json(data);
  });
}

function deleteEncomenda(req,res){
  Service.remove(req.params.uid, (err, data) => {
      if(err) res.status(500).send(err);
      res.json(data);
  });
}

