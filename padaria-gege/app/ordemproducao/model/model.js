'use strict';
let mongoose  = require('mongoose'),
    paginate  = require('mongoose-paginate');

let OrdemProducao = {
  // cliente: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Cliente'
  // },

  dataPrazo: {
    type: Date,
    required: true
  },
  tipoOrdem: {
    type: String,
    required: true
  }

  // itemProducao: [{
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Produto'
  // }]
  
};

let OrdemProducaoSchema = mongoose.Schema(OrdemProducao);
OrdemProducaoSchema.plugin(paginate);
module.exports = mongoose.model('OrdemProducao', OrdemProducaoSchema);
