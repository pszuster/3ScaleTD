var express = require('express'),
    app     = express(),
    swagger = require("./lib/swagger");

app.engine('html', require('ejs').renderFile);
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.get('/', function (req, res) {
	res.render('index.html');
});
app.post('/import', function(req,res){

	console.log("Received: " + req);
 swagger.import(options.file, options.service, options.appplan, options.pattern);
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;

