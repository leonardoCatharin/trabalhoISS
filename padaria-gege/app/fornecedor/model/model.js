
'use strict';
let mongoose  = require('mongoose');

let Fornecedor = {
  nome: {
    type: String,
    required: true
  },
  responsavel: {
    type: String,
    required: true
  },
  endereco: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  }
};

let FornecedorSchema = mongoose.Schema(Fornecedor);
module.exports = mongoose.model('Fornecedor', FornecedorSchema);
