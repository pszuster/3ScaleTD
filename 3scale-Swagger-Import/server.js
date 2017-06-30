var express = require('express'),
    app     = express(),
    bodyParser = require('body-parser'),
    config = require("./lib/config"),
    http = require('http'),
    fs = require('fs'),
    swagger = require("./lib/swagger"),
    services = require("./lib/services"),
    request = require("request"),
    cors = require('cors');


app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/images'));
app.use(cors());

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.get('/', function (req, res) {
	res.render('index.html');
});
app.post('/import', function(req,res){

		
		config.add("threescale:access_token",req.body.access_token);
 	        console.log("TOKEN: " + req.body.access_token);
		console.log("TOKEN CONFIG: " + config.access_token);
		config.add("threescale:id",req.body.threescale_id);
		console.log("ID: " + req.body.threescale_id);
        	config.add("threescale:wildcard",req.body.wildcard_domain);
		console.log("WILDCARD: " + req.body.wildcard_domain);
		console.log("FILE: " + req.body.swagger_file);
		swagger.import(req.body.swagger_file, null ,null,null,res);
		res.write('<html lang="en"><head>  <meta charset="utf-8">  <meta http-equiv=\"X-UA-Compatible" content="IE=edge,chrome=1">  <meta name="viewport" content="width=device-width, initial-scale=1">  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">  <title>3Scale Import</title></head><body>   <img src="3scale-by-redhat.png" style="width:15%;height:15%;"/>   <h1>Swagger Import Tool (non-official)</h1>');

});


app.get('/services',function(req,res){
	services.listServices();
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;

