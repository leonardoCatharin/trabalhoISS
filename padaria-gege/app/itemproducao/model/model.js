'use strict';
let mongoose  = require('mongoose'),
    paginate  = require('mongoose-paginate');

let ItemProducao = {
   quantidade: {
     type: Number,
     required: true
   }
  ,produto: {
    type: mongoose.Schema.ObjectId,
    ref: 'Produto',
    required:true
  }
  
};

let ItemProducaoSchema = mongoose.Schema(ItemProducao);
ItemProducaoSchema.plugin(paginate);
module.exports = mongoose.model('ItemProducao', ItemProducaoSchema);
