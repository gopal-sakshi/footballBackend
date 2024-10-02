var express = require('express');
var router = express.Router();

/***************************************************************************/

router.put('/addPlayer', require("./mongo23_rma").addPlayerCb);
router.put('/updatePlayer', require("./mongo23_rma").updatePlayerCb);
router.put('/searchRM', require("./mongo23_rma").searchRMCb)


router.post('/addEmail', require("./mongo23_email").addEmailCb);
router.get('/emailSearch23/:email', require("./mongo23_email").emailSearchCb);


router.put('/addMovieTelugu', require("./mongo23_movies").addMovieCb);
router.get('/heroHeroine/:movie23', require("./mongo23_movies").heroHeroineCb);
router.put('/updateMovie23/:movie23', require("./mongo23_movies").updateMovieCb23);     // DOESNT WORK
router.put('/updateMovie24/:movie23', require("./mongo23_movies").updateMovieCb24);     // WORKS


module.exports = router;
/***************************************************************************/