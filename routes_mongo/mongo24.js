var express = require('express');
var router = express.Router();
let moviesModel = require('./schemas/moviesSchema');
/******************************************************************/
router.get('/top5Movies', async (req, res) => {
    const queryResult = await moviesModel.find({}, {_id:1, title:1, year:1, rating12:"$imdb.rating"}).limit(5);
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
        { $project: { title: 1, year: 1, plot:1, _id:0 } },
        { $skip: 5 }
    ]).limit(5);
    res.send(queryResult);
});

router.get('/aggregate24_group', async (req, res) => {
    const queryResult = await moviesModel.aggregate([
        // { $project: { title: 1, year: 1, _id:0 } },
    ]).group({ _id: "$year", count23: { $sum: 1 } })
    .sort({ count23: -1 })
    res.send(queryResult);
});

router.post('/update23', async (req, res) => {
    console.log("payload =======> ", req.body);
    const filter23 = { _id: req.body.id }
    // Blacksmith Scene
    const update23 = { title: req.body.newTitle }
    const resp23 = await moviesModel.findOneAndUpdate(filter23, update23);    
    res.send(resp23);
});

router.get('/recentMovies23', async (req, res) => {
    const filter23 = { year: { $gte: 2000, $lte: 2010 } };
    const resp23 = await moviesModel.find(filter23).explain("executionStats", (err, explain) => {
        console.log('MongoDebug =====> ',JSON.stringify(explain, null, 2));
    });
    res.send(resp23);
});

router.get('/search23', async (req, res) => {

    // const resp = await Model.aggregate().search({
    //     text: {
    //         query: 'baseball',
    //         path: 'plot'
    //     }
    // });

    // const queryResult = await moviesModel.aggregate([
    //     { $project: { title: 1, year: 1, _id:0 } }
    // ]).toArray();

    const results = await moviesModel.find({ $text: { $search: 'randomText23_notFound_in_other_docs' } });
    res.send(results);
});


/***************************************************************************/
module.exports = router;
/***************************************************************************/