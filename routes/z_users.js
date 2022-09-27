var express = require('express');
var router = express.Router();
// var config = require(`../config/dynamicConfig${number}`)
/* GET users listing. */
router.get('/', function(req, res, next) {

  // console.log(req.body.club);
  // let config = {};
  // if(req.body.club == 'RealMadrid') {
  //   config = require('../config/dynamicConfig1');
  // } else {
  //   config = require('../config/dynamicConfig2');
  // }
  // res.send(`respond with a resource - ${config.captain}`);
  console.log(config);
  res.send(`respond with a resource - ${config.captain}`);
});

module.exports = router;
