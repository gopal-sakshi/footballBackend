var express = require('express');
var router = express.Router();
let moviesModel = require('./schemas/moviesSchema');
/******************************************************************/
router.get('/top4Movies', async (req, res) => {
    const queryResult = await moviesModel.find({}, {_id:0, title:1, year:1}).limit(5);
    res.send(queryResult);    
});

/***************************************************************************/
module.exports = router;
/***************************************************************************/