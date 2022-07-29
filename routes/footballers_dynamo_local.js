var express = require('express');
var router = express.Router();
var dynamodb = require("../config/dynamo-local-config")

router.post('/createTable', function(req, res){
    console.log('wait - let me create table');
    createTable().then(data => res.send(data)).catch(err => res.send(err));
});
router.post('/addPlayer', function(req,res) {
    // console.log('adding player ',req.body);
    addPlayer(req.body).then(data => res.send(data)).catch(err => res.send(err));
    // res.send('ha ha haha');
});
router.get('/:playerId',function(req,res) {
    getPlayer(req.params.playerId).then(data => res.send(data)).catch(err => res.send(err));
})
/************************************** PRIVATE METHODS ************************************/
function createTable() {
    var params = {
        TableName : "footballers",
        KeySchema: [
            { AttributeName: "id", KeyType: "HASH" },  //Partition key
            { AttributeName: "name", KeyType: "RANGE" }
        ],
        AttributeDefinitions: [
            { AttributeName: "id", AttributeType: "N" },
            { AttributeName: "name", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    }; 
    return new Promise((resolve, reject) => {
        dynamodb.createTable(params, function(err, data) {
            if (err) {
                console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
                reject(err);
            } else {
                console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
                resolve(data);
            }
        });
    });
}

function addPlayer(params23) {

    var params = {
        TableName: "footballers",
        Item: {
            id: { N: params23.id },
            name: { S: params23.name },
            club: { S: params23.club},
            position: { S: params23.position}
        }
    };
    // console.log(params23);
    return new Promise((resolve, reject) => {
        dynamodb.putItem(params, (err, res) => {
            if(err) { reject(err) }
            else resolve(res);
        })
    });
}

function getPlayer(playerId) {
    var params = {
        TableName: 'footballers',        
        Key: { 'id': { "N": playerId }, 'name': { "S": 'Cristiano Ronaldo' } }
    };
    return new Promise((resolve, reject) => {
        dynamodb.getItem(params, (err, data) => {
            if(err) reject(err);
            else resolve(data);
        })
    })
}
/************************************** PRIVATE METHODS ************************************/
module.exports = router;



/* 

    var params_old = {
        TableName : "footballers",
        KeySchema: [
            { AttributeName: "id", KeyType: "HASH" },  //Partition key
            { AttributeName: "name", KeyType: "RANGE" }
        ],
        AttributeDefinitions: [
            { AttributeName: "id", AttributeType: "N" },
            { AttributeName: "name", AttributeType: "S" },
            { AttributeName: "club", AttributeType: "S" },
            { AttributeName: "position", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    }; 



*/