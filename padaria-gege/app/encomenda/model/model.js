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
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
  // ,produtos: [{
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Product'
  // }]
  
};

let EncomendaSchema = mongoose.Schema(Encomenda);
EncomendaSchema.plugin(paginate);
module.exports = mongoose.model('Encomenda', EncomendaSchema);
