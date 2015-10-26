'use strict';
let mongoose  = require('mongoose'),
    paginate  = require('mongoose-paginate');

let Product = {
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
  status: {
    type: String,
    required: true
  },
  
};

let ProductSchema = mongoose.Schema(Encomenda);
ProductSchema.plugin(paginate);
module.exports = mongoose.model('Encomenda', ProductSchema);
