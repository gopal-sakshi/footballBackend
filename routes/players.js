var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('have to send players data');
})

router.post('/', function(req, res) {
    console.log('post request');
    console.log(req.body);
    res.send('player added successfully');
})

module.exports = router;