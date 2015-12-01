'use strict';
let mongoose  = require('mongoose'),
    paginate  = require('mongoose-paginate');

let Encomenda = {
  // cliente: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Cliente'
  // }

  dataSolicitacao: {
    type: Date,
    required: true
  },
  dataEntrega: {
    type: Date,
    required: true
  },
  enderecoEntrega: {
    type: String,
    required: true
  },
  horaEntrega: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  }
  ,ordemProducao: {
    type: mongoose.Schema.ObjectId,
    ref: 'OrdemProducao'
  }
  
};

let EncomendaSchema = mongoose.Schema(Encomenda);
EncomendaSchema.plugin(paginate);
module.exports = mongoose.model('Encomenda', EncomendaSchema);
