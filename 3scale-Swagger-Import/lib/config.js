var inquirer = require("inquirer");
var fs    = require("fs");
var nconf = require("nconf");
var cli = require("./3scale-cli");
var path = require('path');
var osHomedir = require('os-homedir');
var mkdirp = require('mkdirp');

nconf.file({ file: osHomedir()+"/.3scale/credentials.json" });
nconf.load();

exports.configure = function(){
  mkdirp(osHomedir()+"/.3scale/", function (err) {  //check if ~/.3scale exists
      if (err){ console.error(err)
      }
  });
}
exports.getThreeScaleConfig = function(){
  return nconf.get("threescale");
};

exports.add = function(key,value){
  nconf.set(key, value);
  nconf.save();
};

exports.get = function(key){
  return nconf.get(key);
};


exports.access_token = nconf.get("threescale:access_token");
exports.id = nconf.get("threescale:id");
exports.wildcard = nconf.get("threescale:wildcard");
//exports.url = nconf.get("threescale:url");
exports.API = "https://"+nconf.get("threescale:id")+"-admin." + nconf.get("threescale:wildcard") + "/admin/api";
