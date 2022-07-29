var express = require('express');
var router = express.Router();
var path = require("path");


router.get('/submit', (req, res) => {
    console.log('inside submit');    
    console.log("__dirname:  ----------> ", __dirname);
    console.log("process.cwd() --------> ", process.cwd());
    console.log("./ -------------------> ", path.resolve("./"));
    console.log("filename -------------> ", __filename);
    
    res.sendFile(path.resolve("./","resources","index23.html"));
});

router.post('/submit', (req, res) => {
    console.log('got body', req.body);
    console.log('name = ', req.body.first_name);
    res.send(`form received ${req.body.first_name}`);
})
module.exports = router;
//https://medium.com/swlh/read-html-form-data-using-get-and-post-method-in-node-js-8d2c7880adbf
// https://medium.com/codelighthouse/xss-what-it-is-how-it-works-and-how-to-prevent-it-454629e3a0da