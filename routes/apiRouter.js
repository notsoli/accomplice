// api router
const express = require('express');
const router = express.Router();

// main api endpoint
router.get('/', function(req, res) {
    res.send('Welcome to the Accomplice API!');
});

// getProjects api endpoint
const getProjects = require('./api/getProjects');
router.get('/getProjects', getProjects);

// getMembers api endpoint
const getMembers = require('./api/getMembers');
router.get('/getMembers', getMembers);

module.exports = router;