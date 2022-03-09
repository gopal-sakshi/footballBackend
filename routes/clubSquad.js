var express = require('express');
var router = express.Router();
var httpStatusCodes = require("../constants/http-error-codes")
var pgClient = require('../config/postgres-config')

squadsCallback = async function (req, res) {
    
    var clubName = req.params.clubName
    const query44 = `select * from ${clubName};`

    pgClient.connect((err, client, done) => {
        if(err) res.send(err);
        client.query(query44, (err, results) => {
            done();
            if(err) res.send(err);
            else res.send(results.rows);
        })
    })
}

router.get('/:clubName', squadsCallback)



module.exports = router