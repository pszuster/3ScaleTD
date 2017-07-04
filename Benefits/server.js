var express = require('express'),
    app     = express(),    
    cors = require('cors');


app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/lib'));
app.use(cors());

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


var urlProds=process.env.PRODS_URL || 'https://products-apicast-staging.gateway.3scale1.rhtechofficelatam.com:443/rest/services/products';
var urlStock=process.env.STOCK_URL || 'https://stock-apicast-production.gateway.3scale1.rhtechofficelatam.com/odata4/Stock-API/FederatedStock/stock';
var urlStores=process.env.STORES_URL || 'https://stores-apicast-production.gateway.3scale1.rhtechofficelatam.com/store/';
var prodsKey=process.env.PRODS_KEY || 'db085c3b509c1ae0d167fc1f7f3e5e5d';
var stockKey=process.env.STOCK_KEY || 'e7efcf6493907bd2c0d7a7768197ab93';
var storesKey=process.env.STORES_KEY || 'c9160b0e796fb806ce7e195213af2042';


var envVars = {urlProds: urlProds, urlStock: urlStock, urlStores: urlStores, prodsKey: prodsKey, stockKey: stockKey, storesKey:storesKey};

app.get('/', function (req, res) {
	res.render('index.html', {envVars: envVars});
});


app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;

