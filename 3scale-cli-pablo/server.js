var express = require('express'),
    app     = express(),
    bodyParser = require('body-parser'),
    config = require("./lib/config"),
    http = require('http'),
    fs = require('fs'),
    swagger = require("./lib/swagger");

app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.get('/', function (req, res) {
	res.render('index.html');
});
app.post('/import', function(req,res){

 	var swagger_file = fs.createWriteStream("swagger.json");
	var request = http.get(req.body.swagger_file, function(response) {
  		response.pipe(swagger_file);
	});	
	config.add("threescale:access_token",req.body.access_token);
	config.add("threescale:id",req.body.threescale_id);
	config.add("threescale:wildcard",req.body.wildcard_domain);
	 swagger.import("swagger.json", null, null, null);
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;

