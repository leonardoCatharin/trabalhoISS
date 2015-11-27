'use strict';
let Product = require('../model/model');

module.exports = new Service();

function Service(){};

Service.prototype.save = function(value, cb){
  let newProduct = new Product(value);
  Product.create(newProduct, cb)
}

Service.prototype.get = function(page,limit, cb){
  page = page || 1;
  limit = limit || 10;
  Product.paginate({}, {
    page,
    limit
  },cb);
}

Service.prototype.getMissingProducts = function(page, limit, cb){
  Product.find({
    $where: 'this.actualQuantity <= this.lowestQuantity'
  }, cb);
}

Service.prototype.getId = function(id,cb){
  Product.findById(id).populate('user').exec(cb);
}

Service.prototype.remove = function(_id,cb){
  Product
    .find({_id})
    .remove(cb);
}

Service.prototype.update = function(obj, cb){
  Product.findOneAndUpdate(obj._id, obj, {
    new: true
  },cb)
}

Service.prototype.getByName = function(query, cb){
  Product.find(query,cb);
}
