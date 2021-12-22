var AWS = require("../config/aws-config");
var dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoClient