// api router
const express = require('express');
const router = express.Router();
const mongo = require('../../private/mongo');

router.get('/getProjects', async function(req, res) {
  try {
    // create options object
    const options = {};
    for (const option in req.query) {
      if (option === "name") {
        // add name to options
        options.name = {$regex: `/^${req.query[option]}/i`};
      } else if (option === "member") {
        options.member = parseInt(req.query[option]);
      } else if (option === "tags") {
        options.tags = {$all: req.query[option].split(',')}
      } else {
        throw new Error("invalid request parameters");
      }
    }

    const projects = await mongo.getProjects(options);
    res.send({projects: projects});
  } catch (error) {
    res.send({error: error.message});
  }
});

module.exports = router;