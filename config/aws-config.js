
const aws = require("aws-sdk");

aws.config.update ({
  accessKeyId     : "AKIA2MDOCKKQ4A4QW7NN",
  secretAccessKey : "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",
  region          : "us-west-2",
  endpoint: "http://localhost:8000"       // to use this, u MUST first run dynamoDB in local mode
                                          // open a terminal and run the command - ddb 
                                          // remember, you created an alias for ddb (./bash_aliases)
});

module.exports = aws;