var express = require('express');
var router = express.Router();


var AWS = require("../config/aws-config");

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