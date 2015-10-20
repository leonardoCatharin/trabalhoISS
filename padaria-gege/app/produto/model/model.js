'use strict';
let mongoose  = require('mongoose'),
    paginate  = require('mongoose-paginate');

let Product = {
  name: {
    type: String,
    required: true
  },
  code: {
    type: Number,
    required: true
  },
  lowestQuantity: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    validate: {
      validator(v){
        return /MANUFATURADO|REVENDA|MATERIA_PRIMA/.test(v);
      },
      message: 'Este tipo não é autorizado.'
    }
  }
};

let ProductSchema = mongoose.Schema(Product);
ProductSchema.plugin(paginate);
module.exports = mongoose.model('Produto', ProductSchema);
