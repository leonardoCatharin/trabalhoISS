'use strict';
let mongoose = require('mongoose'),
  paginate = require('mongoose-paginate');

let Product = {
  name: {
    type: String,
    required: true
  },
  code: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  supplier: {
    type: String,
    required: true
  },
  actualQuantity: {
    type: Number,
    required: true,
    validate: {
      validator(v) {
          return v >= 0;
        },
        message: 'A quantidade mínima não pode ser menor que 0'
    }
  },
  lowestQuantity: {
    type: Number,
    required: true,
    validate: {
      validator(v) {
          return v >= 0;
        },
        message: 'A quantidade mínima não pode ser menor que 0'
    }
  },
  value: {
    type: Number,
    required: true,
    validate: {
      validator(v) {
          return v >= 0;
        },
        message: 'O valor não pode ser negativo'
    }
  },
  type: {
    type: String,
    required: true,
    validate: {
      validator(v) {
          return /MANUFATURADO|REVENDA|MATERIA_PRIMA/.test(v);
        },
        message: 'Este tipo não é autorizado.'
    }
  }
};

let ProductSchema = mongoose.Schema(Product);
ProductSchema.plugin(paginate);
module.exports = mongoose.model('Produto', ProductSchema);
