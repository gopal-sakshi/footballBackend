var express = require('express');
var router = express.Router();
var httpStatusCodes = require("../constants/http-error-codes")
var dynamoClient = require("../dynamoDb/dynamo-config")


/** display all players */
router.get('/', function(req, res) {
    console.log("display players Data");
    var params = {
        TableName: "fb_playersTable"
    }
    dynamoClient.scan(params, function (err, data) {
        if (err) {
            console.log("unable to fetch players data");
            console.log(err);
            res.status = httpStatusCodes.serverError
            res.send("Unable to fetch player data");
        } else {
            res.send(data);
        }
    })
    
})


/** display all players of a particular club */
/** it seems, this wont work... we can query only on primary keys (or) u need to create index like global secondary index to query on non-primary key columns */
router.get('/:club', async function(req, res) {
    var clubId = req.params.club;

    var params = {
        TableName: 'fb_playersTable',        
        KeyConditionExpression: "#club = :club23",
        ExpressionAttributeNames: { "#club": "club" },
        ExpressionAttributeValues: {
            ":club23": clubId
        }
    };
    
    dynamoClient.query(params, function(err, data) {
        if (err) {
            console.log(err);
            res.send("utter flop")
        } else {
            console.log(data);
            console.log("display teams from ", teamId);
            res.send("very good");
        } 
    });
}) 

/** add a player */
router.post('/addPlayer', function(req, res) {
    console.log('post request for player');
    //console.log(req.body);
    addPlayer(req.body);
    res.send('player added successfully');
})

/************************************* PRIVATE METHODS  ******************************/
function addPlayer(playerData) {
    console.log(playerData);

    var params = {
        TableName: "fb_playersTable",
        Item: {
            "name": playerData.name,
            "age": playerData.age,
            "nationality": playerData.nationality,
            "presentClub": playerData.presentClub,
            "position": playerData.position
        }
    };

    dynamoClient.put(params, function(err, data) {
        if(err) {
            console.log("unable to add... ", err)
        } else {
            console.log("player added");
        }
    })
}

module.exports = router;