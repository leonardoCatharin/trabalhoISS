'use strict';
let mongoose  = require('mongoose'),
    paginate  = require('mongoose-paginate');

let Usuario = {
  login: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true,
    validate: {
      validator(v){
        return /ESTOQUE|VENDA|PRODUCAO|ENCOMENDA|ENTREGA|GERENCIA/.test(v);
      },
      message: 'Este tipo não é autorizado.'
    }
  }
};

let UsuarioSchema = mongoose.Schema(Usuario);
UsuarioSchema.plugin(paginate);
module.exports = mongoose.model('Usuario', UsuarioSchema);
