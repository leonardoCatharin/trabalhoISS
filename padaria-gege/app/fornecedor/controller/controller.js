
'use strict';

let Service = require('../service/service');

module.exports = {
  getFornecedor,
  getFornecedorById,
  getFornecedorByName,
  updateFornecedor,
  saveFornecedor,
  deleteFornecedor
}

function getFornecedor(req,res){
  Service.get((err, data) => {
    if(err) res.status(500).send(err);
    res.json(data);
  });
}

function getFornecedorById(req,res){
  Service.getId(req.params.uid, (err, data) => {
    if(err) res.status(404).send(err);
    res.json(data);
  })
}

function getFornecedorByName(req,res){
  let nome = new RegExp(req.query.nome);
  Service.getByName({nome}, (err, data) => {
    if (err) res.status(500).send(err);
    res.json(data);
  });
}

function updateFornecedor(req,res){
  Service.update(req.body, (err,data) => {
    if(err) res.status(404).send(err);
    res.json(data);
  });
}

function saveFornecedor(req,res){
  Service.save(req.body, (err) => {
    if(err) res.status(422).send(err.errors);

    res.json({
      content: "Ok"
    });
  });
}

function deleteFornecedor(req,res){
  Service.remove(req.params.uid, (err, data) => {
      if(err) res.status(500).send(err);
      res.json(data);
  });
}
