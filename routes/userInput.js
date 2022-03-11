var express = require('express');
var bodyParser = require('body-parser')

var router = express.Router();


router.get('/submit', (req, res) => {
    console.log('inside submit');
    res.sendFile(__dirname + '/index23.html');
});

router.post('/submit', (req, res) => {
    console.log('got body', req.body);
    res.send('form received');
})
module.exports = router;
//https://medium.com/swlh/read-html-form-data-using-get-and-post-method-in-node-js-8d2c7880adbf