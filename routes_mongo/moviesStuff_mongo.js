// the first time you call require(‘mongoose’), 
    // it is creating an instance of the Mongoose class and returning it. 
    // On subsequent calls, it will return the same instance that was created and returned to you the first time 
    // because of how module import/export works in ES6.
    // see module_import_workflow
/***************************************************************************/

var express = require('express');
var router = express.Router();
let EmailModel = require('./schemas/emailSchema');
let TeluguModel = require('./schemas/teluguSchema');
/***************************************************************************/




/***************************************************************************/

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


router.put('/addMovieTelugu', async (req, res) => {
    let msg = new TeluguModel(req.body);
    const result23 = await msg.save().then(doc => {
        console.log(doc);
        return true;
    }).catch(err => {
        console.log(err);
        return false;
    });
    if(result23) res.send('hittu, movie added');
    else res.send('phatttuuu');
});

router.get('/emailSearch23/:email', async (req, res) => {

    // APPROACH I =====> normally return
    const queryResult = await EmailModel.find({
        email: req.params.email
    }).then(doc => {console.log(doc); return doc}).catch(err => null);
    if(queryResult != null) res.send({ result23: queryResult });
    else res.send('error found');

    // APPROACH II =====> return obfuscated value
        // not working... look into it later...
    // return EmailModel.findOne({
    //     email: req.params.email
    // }).then(doc => res.json(doc)).catch(res.json({message: 'obfuscate pani cheyyala'}));    
    
});


// findOneAndUpdate
// EmailModel.findOneAndUpdate(
//   { email: 'ada.lovelace@gmail.com' },                                  // search query
//   { email: 'theoutlander@live.com'  },                                 // field:values to update
//   { new: true, runValidators: true }              // return updated doc... validate before update
// ).then().catch();


// delete
// EmailModel.findOneAndRemove({
//     email: 'theoutlander@live.com'
// }).then().catch();

router.get('/heroHeroine/:movie23', async (req, res) => {
    console.log(req.params.movie23);
    const queryResult = await TeluguModel.findOne({
        'name': req.params.movie23                        // searches in 'name' field in teluguSchema
    }).then(doc => {
        console.log(doc.toObject({virtuals:true}));
        return doc;
    });
    res.send(queryResult);
    // if(queryResult) res.send({res23: queryResult});
    // else res.send('po ra rei');
});

// Not WORKINGGGGGGGGGGGGGG
router.get('/updateMovie/:movie23', async (req, res) => {
    const queryResult = await TeluguModel.findOne({
        'name': req.params.movie23
    }).then(doc => {
        // doc.heroDir = 'hero22__dir22';               
        // doc.set('heroDir', 'hero22__dir22');
    }).catch(err => {console.log(err); return null});
    if(queryResult) res.send(queryResult);
    else res.send('poyindi');
});


/***************************************************************************/





/***************************************************************************/
module.exports = router;
/***************************************************************************/