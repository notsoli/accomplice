// api router
const express = require('express');
const router = express.Router();
const mongo = require('../../private/mongo');

router.get('/getMembers', async function(req, res) {
  try {
    // create options object
    const options = {};
    for (const option in req.query) {
      if (option === "id") {
        // check if id is an integer
        const id = req.query[option]
        if (isNaN(id)) throw new Error("id must be an integer");

        // add id to options
        options.id = parseInt(id);
      } else {
        throw new Error("invalid request parameters");
      }
    }

    // get members that match search queries
    const members = await mongo.getMembers(options);
    res.send({members: members});
  } catch (error) {
    res.send({error: error.message});
  }
});

module.exports = router;