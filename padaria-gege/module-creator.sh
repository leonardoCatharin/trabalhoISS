#! /usr/bin/env bash
echo "What's the name of the module?"
read MODULE_NAME

svcfile="
'use strict';
let ${MODULE_NAME} = require('../model/model');

module.exports = new Service();

function Service(){};

Service.prototype.get = function(){
  ${MODULE_NAME}
  .find({})
  .exec(callback);
}

Service.prototype.save = function(value,cb){
  let aux = new${MODULE_NAME}(value);
  aux
  .save(cb);
}

Service.prototype.getId = function(id,callback){
  ${MODULE_NAME}
  .findById(id)
  .exec(callback);
}

Service.prototype.remove = function(_id,cb){
  ${MODULE_NAME}
    .find({_id})
    .remove(cb);
}

Service.prototype.update = function(obj, callback){
  ${MODULE_NAME}.findOneAndUpdate(obj._id, obj, {
    new: true
  })
  .exec(callback)
}"

ctrlfile="
'use strict';

let Service = require('../service/service');

module.exports = {
  get${MODULE_NAME},
  get${MODULE_NAME}ById,
  update${MODULE_NAME},
  save${MODULE_NAME},
  delete${MODULE_NAME}
}

function get${MODULE_NAME}(req,res){
  Service.get((err, data) => {
    if(err) res.status(500).send(err);
    res.json(data);
  });
}

function get${MODULE_NAME}ById(req,res){
  Service.getId(req.params.uid, (err, data) => {
    if(err) res.status(404).send(err);
    res.json(data);
  })
}

function update${MODULE_NAME}(req,res){
  Service.update(req.body, (err,data) => {
    if(err) res.status(404).send(err);
    res.json(data);
  });
}

function save${MODULE_NAME}(req,res){
  Service.save(req.body, (err) => {
    if(err)
      res.status(422).send(err.errors);

    res.json({
      content: \"Ok\"
    });
  });
}

function delete${MODULE_NAME}(req,res){
  Service.remove(req.params.uid, (err, data) => {
      if(err) res.status(500).send(err);
      res.json(data);
  });
}
"
modelfile="
'use strict';
let mongoose  = require('mongoose');

let ${MODULE_NAME} = {};

let ${MODULE_NAME}Schema = mongoose.Schema(${MODULE_NAME});
module.exports = mongoose.model('${MODULE_NAME}', ${MODULE_NAME}Schema);
"

routefile="
'use strict';

let Controller = require('../controller/controller');

module.exports = (app) => {

  let url = '/api/${MODULE_NAME}';

  app.get(url, Controller.get${MODULE_NAME});

  app.get(url + '/:uid', Controller.get${MODULE_NAME}ById);

  app.put(url + '/:uid', Controller.update${MODULE_NAME});

  app.post(url, Controller.save${MODULE_NAME});

  app.delete(url + '/:uid', Controller.delete${MODULE_NAME});

}
"


function http {
  mkdir -p ./app/$MODULE_NAME
  cd app/$MODULE_NAME
  mkdir service && cd service && echo "$svcfile" >> service.js && cd .. &
  mkdir controller && cd controller && echo "$ctrlfile" >> controller.js && cd ..&
  mkdir model && cd model && echo "${modelfile}" >> model.js && cd ..&
  mkdir route && cd route && echo "${routefile}" >> route.js && cd ..&
  wait
  echo "DONE."
  break;
}


options=("HTTP" "Socket")
select opt in "${options[@]}"; do
  case $opt in
    "HTTP")
      echo "You choosed wisely"
      http
      ;;
    "Socket")
      echo "You choosed wisely again"
      ;;
      *) echo "Invalid Option"
  esac
  break
done

