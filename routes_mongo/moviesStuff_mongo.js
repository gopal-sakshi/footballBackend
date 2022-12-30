// the first time you call require(‘mongoose’), 
    // it is creating an instance of the Mongoose class and returning it. 
    // On subsequent calls, it will return the same instance that was created and returned to you the first time 
    // because of how module import/export works in ES6.
    // see module_import_workflow
/***************************************************************************/

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
/***************************************************************************/

let EmailModel = require('./emailSchema');

router.put('/addEmail', async (req, res) => {
    
    console.log('add email ', req.body);
    let msg = new EmailModel({
        email: req.body.email
    });
    const result23 = await msg.save().then(doc => {
        console.log(doc);
        return true;
    }).catch(err => {
        console.log(err);
        return false;
    });

    if(result23) res.send('hittuu');
    else res.send('phattuu');
});

/***************************************************************************/





/***************************************************************************/
module.exports = router;