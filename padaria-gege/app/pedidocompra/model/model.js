'use strict';
let mongoose  = require('mongoose'),
    paginate  = require('mongoose-paginate');

let PedidoCompra = {
  // fornecedor: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Fornecedor'
  // },

  codigoFatura: {
    type: String,
    required: true
  },

  dataVencimento: {
    type: Date,
    required: true
  },
  // itemPedido: [{
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'itemPedido'
  // }]
  
};

let PedidoCompraSchema = mongoose.Schema(PedidoCompra);
PedidoCompraSchema.plugin(paginate);
module.exports = mongoose.model('PedidoCompra', PedidoCompraSchema);
