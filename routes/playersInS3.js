var express = require('express');
var router = express.Router();

var fs = require('fs');
var s3Client = require("../S3/s3-config");

var bucketName1 = 'gopal612-football-backend-acl';      // it seems, we need to change permissions of each object uploaded in this bucket
var bucketName2 = 'gopal612-football-backend-no-acl';   // we need to create a policy and change the permissions


var filePath = 'resources/player.json';

router.get('/', (req, res) => {
    console.log('ikkadeeee ', req.url);
    console.log('inside get of playersInS3');
    res.status(200).send('okay.. get of playersInS3');
})


router.put('/addPlayer', function (req, res) {
    console.log(req.body);

    // learn differences between putObject() & upload() later
    s3Client.upload(
        {
            Bucket: bucketName2,
            Body: fs.createReadStream(filePath),
            Key: `${req.body.playerName}`
        },
        (err, data) => {
            if(err) {
                console.log('Error is ', err);
                res.status(400).send('phattu, couldnt upload');
            }
            if(data) {
                console.log('uploaded in S3');
                res.status(200).send(`uploaded arey ${req.body.playerName}`);
            }
        }
    )    
})

module.exports = router;