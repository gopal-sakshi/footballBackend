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

/***************************************************************************/
module.exports = router;
/***************************************************************************/