var threescale = require('3scale');
var Client = threescale.Client;
var client = new Client('PROVIDER_KEY');
var serviceID = 'SERVICE_ID';

function getMethodName (path, method) {
  if (!path || !method) return 'hits';
  var pathFrag = path.replace(/^\/|\/$/g, '').replace(/\//g, '_');
  return pathFrag + '_' + method;
}

function authenticate (user_key, method, callback) {
  var options = { 'user_key': user_key, 'usage': {}, 'service_id': serviceID };

  options['usage'][method] = 1;

  client.authrep_with_user_key(options, function (res) {
    if (res.is_success()) {
      callback(null, res.is_success());
    } else {
      callback('403, unauthorized');
    }
  });
};

/**
 * Lambda function to be used as an AWS API gateway endpoint handler.
 * Requires setting up the following Mapping Template:
 *   - Content-Type: application/json
 *   - Template:
 *       {
 *         "user_key": "$input.params('user_key')",
 *         "resourcePath": "$context.resourcePath",
 *         "httpMethod": "$context.httpMethod",
 *         "body": $input.json('$')
 *       }
 *
 */

exports.handler = function(event, context) {
  var method = getMethodName(event.resourcePath, event.httpMethod);

  if (event.user_key) {
    authenticate(event.user_key, method, function (err, res) {
      if (err) {
        context.fail(err);
      } else {
        context.succeed(true);
      }
    });
  } else {
    context.fail('user_key missing');
  }
};
