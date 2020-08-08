// api router
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send('Welcome to the Accomplice API!');
});

module.exports = router;