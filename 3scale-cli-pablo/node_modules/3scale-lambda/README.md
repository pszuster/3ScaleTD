# 3scale Lambda generator

This module generates a Lambda function to integrate the AWS API Gateway with 3scale.
Authentication will be required as a `user_key` query parameter. 

## Prerequisites

Create the following [Mapping Template](http://docs.aws.amazon.com/apigateway/latest/developerguide/models-mappings.html) in your AWS API Gateway endpoint:

```json
{
  "user_key": "$input.params('user_key')",
  "resourcePath": "$context.resourcePath",
  "httpMethod": "$context.httpMethod",
  "body": "$input.json('$')"
}
```

The `Content-Type` of the mapping template should be `application/json`.

## Method names

For each API endpoint you should create the corresponding method in 3scale. That way you will be able to keep track of the aggregate usage of your API as well as the breakdown per endpoint.

It is important that you create the method names in 3scale following this pattern:

- Endpoint HTTP method: GET
- Endpoint path: /api/words
- **3scale method name**: api_words_GET

## Using it programatically

```js
var generator = require('3scale-lambda');
var params = {
  providerKey: '3SCALE_PROVIDER_KEY',
  serviceId: '3SCALE_SERVICE_ID'
};
generator(params, '/output/path/');
```

This will create a zip file at `/output/path/3scale-lambda-auth.zip`. That zip is the bundle containing the Lambda function and all its dependencies, ready to be uploaded to AWS.
