var express = require('express');
var router = express.Router();
/************************************************************************* */
// APPROACH I
var { pgPool, pgClient } = require('../config/postgres-config');
pgPool.on('error', (err, client) => { console.error('Error pgPool phattu: ', err); });
pgClient.on('error', (err, client) => { console.error('Error pgClient phattu: ', err); });

// APPROACH II
// const pgModule = require('../config/postgres-config');
// var pgPool = pgModule.pgPool;
// var pgClient = pgModule.pgClient;
/**************************************************************************/

// It seems callback functions must be defined ahead of routes...
squadsCallback = async function (req, res) {
    
    var clubName = req.params.clubName;
    const query44 = `select * from ${clubName};`;
    console.log(query44);

    // // using pgClient... but postgres connection is closed for subsequent queries
    // pgClient.connect((err, client) => {
    //     if(err) res.send(err);
    //     client.query(query44, (err, results) => {            
    //         if(err) res.send(err);
    //         else res.send(results.rows);
    //     });
    // });

    // // using pgPool with Promise... 
    // const response = await pgPool.query(query44);
    // res.send(response.rows);

    // // using pgPool with Callback
    pgPool.connect((err, client, done) => {
        if(err) res.send(err);
        client.query(query44, (err, results) => {
            done();
            if(err) res.send(err);
            else { res.send(results); }
        });
    });
}

addPlayerCallback = async function (req, res) {
    console.log(req.body);
    var clubName = req.params.clubName;
    const query45 = `insert into ${clubName} values (${req.body.id}, '${req.body.player}', '${req.body.position}', '${req.body.country}')`;
    const query46 = `insert into ${clubName} (id, player, position, country, comments, otherclubs, isactive, year_joined) values ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const params12 = [ req.body.id, req.body.player, req.body.position, req.body.country, req.body.comments, req.body.otherclubs, req.body.isactive, req.body.year_joined ];
    pgPool.connect((err, client, done) => {
        if(err) res.send(err);
        client.query({text:query46, values:params12}, (err, results) => {
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