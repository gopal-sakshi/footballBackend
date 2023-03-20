var express = require('express');
var router = express.Router();
var redisClient2 = require('../config/redis-local-config');
const axios = require('axios');
const MOCK_API = "https://jsonplaceholder.typicode.com/users/";

/************************************************************************* */

router.get('/user/:email', async (req, res) => {
    const email23 = req.params.email;
    const res23 = await redisClient2.get(email23);
    if(res23 != null) {
        res.send({ data:res23, source23:'redis' })
    } else {
        const response = await axios.get(`${MOCK_API}?email=${email23}`);        
        await redisClient2.setEx(email23, 300, JSON.stringify(response?.data));
        res.send({ data:response?.data, source23: 'httpCall' });
    }
})

/************************************************************************* */
module.exports = router;