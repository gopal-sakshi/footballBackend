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
let rmModel = require('./schemas/realMadrid');
/***************************************************************************/




/***************************** REAL MADRID ****************************************/

let addPlayerCb = async(req, res) => {
    let player = new rmModel(req.body);
    console.log(player);
    const result23 = await player.save().then(doc => {
        return true
    }).catch(err => {console.log(err); return false});
    if(result23) res.send('hittu, player added');
    else res.send('phatttuuu');
}

let updatePlayerCb = async(req, res) => {
    let player = new rmModel(req.body);
    console.log(player);
    const filter12 = { playerName: player.playerName };
    const update12 = { phone: player.phone };
    const result23 = await rmModel.findOneAndUpdate(filter12, update12, { new: true });
    res.send(result23);
}

let searchRMCb = async(req, res) => {
    let searchString = req.body.searchString;
    const result23 = await rmModel.find({
        $text: { $search: searchString }
    }).then(doc => { console.log(doc); return doc }).catch(err => null);
    if(result23) res.send(result23);
    else res.send('phattu');
}

// build a text index and use it to find coffee shops, given only text fields.
    // https://www.mongodb.com/docs/v4.4/text-search/

/***************************************************************************/



/************************** EMAIL *************************************/
let addEmailCb = async (req, res) => {
    
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
}

let emailSearchCb = async (req, res) => {

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
    
}

router.put('/addEmail', addEmailCb);
router.get('/emailSearch23/:email', emailSearchCb);

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
/***************************************************************************/


/***************************** MOVIES ***************************************/
let addMovieCb = async (req, res) => {
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
}

let heroHeroineCb = async (req, res) => {
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
}

let updateMovieCb = async (req, res) => {
    const queryResult = await TeluguModel.findOne({
        'name': req.params.movie23
    }).then(doc => {
        // doc.heroDir = 'hero22__dir22';               
        // doc.set('heroDir', 'hero22__dir22');
    }).catch(err => {console.log(err); return null});
    if(queryResult) res.send(queryResult);
    else res.send('poyindi');
}

/***************************** MOVIES ***************************************/
router.put('/addMovieTelugu', addMovieCb);
router.get('/heroHeroine/:movie23', heroHeroineCb);
router.get('/updateMovie/:movie23', updateMovieCb);             // Not WORKINGGGGGGGGGGGGGG


/***************************** REAL MADRID ****************************************/

router.put('/addPlayer', addPlayerCb);
router.put('/updatePlayer', updatePlayerCb);
router.put('/searchRM', searchRMCb)

/***************************************************************************/





/***************************************************************************/
module.exports = router;
/***************************************************************************/