var express = require('express');
var router = express.Router();
let moviesModel = require('./schemas/moviesSchema');
/******************************************************************/
router.get('/top5Movies', async (req, res) => {
    const queryResult = await moviesModel.find({}, {_id:0, title:1, year:1, rating12:"$imdb.rating"}).limit(5);
    res.send(queryResult);    
});

router.get('/top4Movies', async (req, res) => {    
    const queryResult = await moviesModel.find()
    .select('title year imdb.rating')
    .limit(4);
    res.send(queryResult);    
});

// NOT WORKING
router.get('/top6Movies', async (req, res) => {    
    const queryResult = await moviesModel.find()
    .populate('title', 'year', 'imdb.rating')
    .limit(6);
    res.send(queryResult);    
});

router.get('/aggregate23', async (req, res) => {
    const queryResult = await moviesModel.aggregate([
        { $project: { title: 1, year: 1, _id:0 } },
        { $skip: 5 }
    ]).limit(5);
    res.send(queryResult);
});

// aggregate.group({ _id: "$department" });
router.get('/aggregate24_group', async (req, res) => {
    const queryResult = await moviesModel.aggregate([
        { $project: { title: 1, year: 1, _id:0 } },
        { $skip: 5 }
    ]).group({ _id: "$year"});
    res.send(queryResult);
});

/***************************************************************************/
module.exports = router;
/***************************************************************************/