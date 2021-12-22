var express = require('express');
var router = express.Router();

var dynamoClient = require("../dynamoDb/dynamo-config")

router.get('/', function(req, res) {
    console.log("display players Data");
    var params = {
        TableName: "fb_playersTable"
    }
    dynamoClient.scan(params, function (err, data) {
        if (err) {
            console.log("unable to fetch players data");
            console.log(err);
            res.send("Unable to fetch player data");
        } else {
            res.send(data);
        }
    })
    
})

router.post('/', function(req, res) {
    console.log('post request for player');
    //console.log(req.body);
    addPlayer(req.body);
    res.send('player added successfully');
})

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