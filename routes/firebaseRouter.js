var express = require('express');
var router = express.Router();
var path = require("path");

/************************************************************* */
var admin = require("firebase-admin");
var serviceAccount = require('../config/firebase-admin-config.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),  
  databaseURL: "https://gopal61288-01.firebaseio.com",
});
const firestore = admin.firestore();
/************************************************************* */

router.post('/send', async (req, res) => {
    console.log(req.body);
    var newData = req.body;
    try {
        await firestore
            .collection('testing_chats')
            .doc('user44')
            .set(newData)
            .then( data => { console.log(data) })
    } catch (error) {
        console.log(error)
    }
    res.status(200).send('firebase send');
});


module.exports = router