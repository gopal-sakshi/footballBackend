var express = require('express');
var router = express.Router();
/*********************************************** */
// APPROACH I
// var { pgPool } = require('../config/postgres-config');

// APPROACH II
const pgModule = require('../config/postgres-config');
var pgPool = pgModule.pgPool;
var pgClient = pgModule.pgClient;
/*********************************************** */

// It seems callback functions must be defined ahead of routes...
squadsCallback = async function (req, res) {
    
    var clubName = req.params.clubName;
    const query44 = `select * from ${clubName};`;
    console.log(query44);
    pgClient.connect((err, client) => {
        if(err) res.send(err);
        client.query(query44, (err, results) => {
            // done();         // done() is like a callback function... informing the caller, that this async function is done
            if(err) res.send(err);
            else res.send(results.rows);
        });
    });
}

addPlayerCallback = async function (req, res) {
    console.log(req.body);
    var clubName = req.params.clubName;
    const query45 = `insert into ${clubName} values (${req.body.id}, '${req.body.player}', '${req.body.position}', '${req.body.country}')`;
    pgPool.connect((err, client, done) => {
        if(err) res.send(err);
        client.query(query45, (err, results) => {
            done();
            if(err) res.send(err);
            else { console.log(results); res.send('added row babai'); }
        });
    });
    // res.send('undavayya');
}

/*********************************************** */
// List of routes...

router.post('/:clubName/addPlayer', addPlayerCallback);
router.get('/:clubName', squadsCallback);


/*********************************************** */


module.exports = router