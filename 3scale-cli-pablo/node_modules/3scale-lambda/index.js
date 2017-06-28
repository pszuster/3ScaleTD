var archiver = require('archiver');
var path     = require('path');
var fs       = require('fs');
var split    = require('split');
var through  = require('through');

// set up archiver

var archive = archiver('zip');
archive.on('error', function (err) {
  throw err;
});

// get a readable-writable stream that applies a
// string replacement over an input stream

function getReplacementStream (regex, value) {
  return through(function (line) {
    this.queue(line.replace(regex, value));
  });
}

// get a readable stream that returns the Lambda
// function file with the right key in place

function getInputStream (options) {
  return fs.createReadStream(__dirname + '/deps/aws_3scale_auth.js')
          .pipe(split())
          .pipe(getReplacementStream(/PROVIDER_KEY/, options.providerKey))
          .pipe(getReplacementStream(/SERVICE_ID/, options.serviceID));
}

/**
 * Generates a Lambda function to authenticate API calls with 3scale.
 * The output is a zip bundle including the Lambda function and all its
 * dependencies.
 * @param  {String} providerKey     – a 3scale provider key
 * @param  {String} destinationPath – an absolute path (excluding filename)
 */

module.exports = function generator (options, destinationPath) {
  var output = fs.createWriteStream(
    path.join(destinationPath, '3scale-lambda-auth.zip')
  );
  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('zip bundle is ready');
  });
  archive.pipe(output);

  archive
    .append(getInputStream(options), { name: 'aws_3scale_auth.js' })
    .directory(__dirname + '/deps/node_modules', 'node_modules')
    .finalize();
}
