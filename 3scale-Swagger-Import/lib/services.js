var nconf = require("nconf");
var config = require("./config");
var cli = require("./3scale-cli");
var slug = require("slug");
var Q = require("q");
var request = Q.denodeify(require("request"));
var HttpError = require('http-error-constructor');

exports.createService = function(name){
    var url = config.API+"/services.json";
	var n = name+Math.floor((Math.random() * 50) + 10);
	var options ={
      method:'POST',
      uri: url,
      form:{
        "access_token": config.get("threescale:access_token"),
        "name": name, //TODO get rid of random
        "system_name": slug(n,"_")
      },
      rejectUnauthorized: false,
      timeout:10000
    };
	console.log("Pre-Service-Req - url: " + config.API);
    var response = request(options);

    return response.then(function (r) {
	   console.log("POST-Service-Req");
     var res  = r[0].req.res;
     try {
       var body = JSON.parse(res.body);
     } catch(e) {
	     console.log("Error: " + e.message);
     }
      if (res.statusCode >= 300) {
        var err = new HttpError(res.statusCode)
        var message = "ERROR encountered: "
        if(body && body.error){ //error message in body
          message += body.error
        }else{
          message += "["+res.statusCode+"] "+err.message
        }
        cli.error({message: message});
        throw new Error("Server responded with status code " + res.statusCode);
      } else {
        config.add("threescale:service_id",body.service.id);
        return body.service;//assuming tapes are strings and not binary data
      }
    });

};

exports.listServices = function (){
  var url = config.API+"/services.json?access_token=" + config.access_token;
  var options ={
    method:'GET',
    uri: url,
    /*form:{
      "access_token": config.access_token
    },*/
    rejectUnauthorized: false,
	  timeout:10000
  };

  var response = request(options);
	return response.then(function (r) {
    var res  = r[0].req.res;
    var body = JSON.parse(res.body);
    if (res.statusCode >= 300) {
      cli.error({message:"ERROR encountered: " + JSON.stringify(body.error || body.status)});
      throw new Error("Server responded with status code " + r[0].statusCode + " "+JSON.stringify(body.error || body.status));
    } else {
      		console.log(body.services);
	    return body.services;
    }
  }).catch(function(err){console.log(err);});
}

exports.getServiceByID = function(service_id){
  var url = config.API+"/services/"+service_id+".json";
  var options ={
    method:'GET',
    url: url,
    form:{
      "access_token": config.access_token,
      "id": service_id
    },
	  rejectUnauthorized: false
  };
  var response = request(options);
  return response.then(function (r) {
    var res  = r[0].req.res;
    var body = JSON.parse(res.body);
    if (res.statusCode >= 300) {
      cli.error({message:"ERROR encountered: " + JSON.stringify(body.error || body.status)});
      throw new Error("Server responded with status code " + r[0].statusCode + " "+JSON.stringify(body.error || body.status));
    } else {
      return body.service;
    }
  });
}

exports.updateService = function(service_id, name){
  var url = config.API+"/services/"+service_id+".json";
  var options ={
    method:'PUT',
    url: url,
    form:{
      "access_token": config.access_token,
      "id": service_id,
    },
	  rejectUnauthorized: false
  };

  if(name)
    options.form["name"]=name

  var response = request(options);
  return response.then(function (r) {
    var res  = r[0].req.res;
    var body = JSON.parse(res.body);
    if (res.statusCode >= 300) {
      cli.error({message:"ERROR encountered: " + JSON.stringify(body.error || body.status)});
      throw new Error("Server responded with status code " + r[0].statusCode + " "+JSON.stringify(body.error || body.status));
    } else {
      return body.service;
    }
  });
}
