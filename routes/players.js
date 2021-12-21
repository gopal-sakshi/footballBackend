var express = require('express');
var router = express.Router();


var AWS = require("aws-sdk");

AWS.config.update({  
  endpoint: "http://localhost:8000",
  accessKeyId: 'AKIA2MDOCKKQ4A4QW7NN',
  secretAccessKey: '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', 
  region: 'us-west-2'
});

router.get('/', function(req, res) {
    res.send('have to send players data');
})

router.post('/', function(req, res) {
    console.log('post request');
    //console.log(req.body);
    addPlayer(req.body);
    res.send('player added successfully');
})

function addPlayer(playerData) {
    console.log(playerData);
}

module.exports = router;