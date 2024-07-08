var express = require('express');
var blahRouter = express.Router();
const { Pool } = require("pg");
let credentials23 = {
    user: 'postgres',
    password: "1258",
    host: 'localhost',
    port: 5432,
    database: 'triggers23',
  }
const pgPool23 = new Pool(credentials23);

blahRouter.get('/allMsgs', async (req, res) => {
    const query44 =  `select * from messages12;`
    pgPool23.connect(async (err, client) => {
        if(err) { console.log("err34 =====> ", err); res.send(err); }
        client.query(query44, (err, results) => {            
            if(err) res.send(err);
            else res.send(results.rows);
        });
    });
})

var timeoutArray = { };
const triggerApiCall = (custId, msg) => {
    // console.log("custId list ====> ", Object.keys(timeoutArray), 
    //     Object.values(timeoutArray).map(value23 => { return value23._onTimeout.toString() })
    // );
    // ternary operator --->  ( stmt1, stmt2 ) ===> we can execute 2 statements with ternary operator & ( )
    timeoutArray[custId] ? ( console.log("clearing timeout ", custId), clearTimeout(timeoutArray[custId]) ) : '';
    let timeoutItem = setTimeout(makeApiCall, 10000, custId, msg);
    timeoutArray[custId] = timeoutItem;
}

function makeApiCall(custId, msg) {
    // console.log(`making api call ${custId} ===>`, new Date().toISOString());
    console.log(`making api call ${custId} ===>`, msg);
    timeoutArray[custId] 
}

blahRouter.post('/message11', async (req, res) => {
    var payload = req.body;
    let resp23 = []; let i=0;
    for (i=0; i< payload.length; i++) {
        let pl = payload[i];    // console.log("query23 ====> ", pl.custId);
        const query44 = `insert into messages12 (customer_id, message11, meta, created_at, updated_at) values (
            '${pl.custId}', '${pl.msg}', null, '${new Date().toISOString()}', '${new Date().toISOString()}') returning true;`;
        triggerApiCall(pl.custId, pl.msg);
        pgPool23.connect(async (err, client, done) => {
            if(err) { console.log("err34 =====> ", err); res.send(err); }
            client.query(query44, (err, results) => {
                done();            
                if(err) res.send(err);
                else resp23.push(results.rows);
                // console.log("i ====> ", i);
                // if(i == payload.length-1) { res.send({ info: 'done', data23: resp23 })}
            });
        });
    }
    res.send({ info: 'rcvd queries' });
});
module.exports = blahRouter;