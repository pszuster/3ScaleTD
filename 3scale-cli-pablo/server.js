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
app.use(cors());

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.get('/', function (req, res) {
	res.render('index.html');
});
app.post('/import', function(req,res){

		
		config.add("threescale:access_token",req.body.access_token);
 	        config.add("threescale:id",req.body.threescale_id);
        	config.add("threescale:wildcard",req.body.wildcard_domain);
		swagger.import(req.body.swagger_file, null ,null,null);
});


app.get('/services',function(req,res){
	services.listServices();
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;

