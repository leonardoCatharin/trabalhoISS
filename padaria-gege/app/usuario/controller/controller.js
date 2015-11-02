'use strict';
let Service = require('../service/service');

module.exports = {
  getUsuario,
  getUsuarioById,
  updateUsuario,
  saveUsuario,
  deleteUsuario
}

function getUsuario(req,res){
  Service.get(req.page, req.limit, (err, data) => {
    if(err) res.status(500).send(err);
    res.json(data);
  });
}

function getUsuarioById(req,res){
  Service.getId(req.params.uid, (err, data) => {
    if(err) res.status(404).send(err);
    res.json(data);
  })
}

function updateUsuario(req,res){
  Service.update(req.body, (err,data) => {
    if(err) res.status(404).send(err);
    res.json(data);
  });
}

function saveUsuario(req,res){
  console.log(req,res)
  Service.save(req.body, (err,data) => {
    if(err) res.status(422).send(err.errors.type.properties.message);
    res.json(data);
  });
}

function deleteUsuario(req,res){
  Service.remove(req.params.uid, (err, data) => {
      if(err) res.status(500).send(err);
      res.json(data);
  });
}
