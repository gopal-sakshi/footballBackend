var express = require('express');
var router = express.Router();

var dynamoClient = require("../config/dynamo-config")

router.get('/', function(req, res) {
    console.log("display team Data");
    var params = {
        TableName: "fb_teamsTable"
    }
    dynamoClient.scan(params, function (err, data) {
        if (err) {
            console.log("unable to fetch team data");
            console.log(err);
            res.send("Unable to fetch team data");
        } else {
            res.send(data);
        }
        
    })
})

router.post('/', function(req, res) {
    console.log('post request for team');
    //console.log(req.body);
    addTeam(req.body);
    res.send('team added successfully');
})

function addTeam(teamData) {
    console.log(teamData);

    var params = {
        TableName: "fb_teamsTable",
        Item: {
            "clubName": teamData.clubName,
            "country": teamData.country,
            "domesticTitles": teamData.domesticTitles,
            "clTitles": teamData.clTitles,
            "stadium": teamData.stadium
        }
    };

    dynamoClient.put(params, function(err, data) {
        if(err) {
            console.log("unable to add... ", err)
        } else {
            console.log("team added hello very good");
        }
    })
}

module.exports = router;