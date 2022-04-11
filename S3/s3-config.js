var AWS = require("../config/aws-config");
var s3Client = new AWS.S3();

module.exports = s3Client;