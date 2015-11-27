'use strict';
let Usuario = require('../model/model');

module.exports = new Service();

function Service(){
};

Service.prototype.save = function(value, cb){
  let newUsuario = new Usuario(value);
  Usuario.create(newUsuario, cb)
}

Service.prototype.get = function(page,limit, cb){
  page = page || 1;
  limit = limit || 10;
  Usuario
      .populate('user')
      .exec(cb);
      //.paginate({}, {page, limit },cb);
};

Service.prototype.getId = function(id,cb){
  Usuario.findById(id, cb);
}

Service.prototype.remove = function(_id,cb){
  Usuario
    .find({_id})
    .remove(cb);
}

Service.prototype.update = function(obj, cb){
  Usuario.findOneAndUpdate(obj._id, obj, {
    new: true
  },cb)
}
Service.prototype.authenticate = function(obj, cb){
  Usuario.findOne({login:obj.login}, {
    new: true
  },cb)
}
