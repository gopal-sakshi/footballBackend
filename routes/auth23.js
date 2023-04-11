const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
    res.send('signup pending');
});

module.exports = router;