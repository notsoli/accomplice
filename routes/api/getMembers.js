// api router
const Router = require('koa-router');
const router = new Router();
const db = require('../../private/db');

router.get('/getMembers', async ctx => {
  try {
    // create options object
    const options = {};
    for (const option in ctx.request.query) {
      if (option === "id") {
        // check if id is an integer
        const id = ctx.request.query[option];
        if (isNaN(id)) throw new Error("id must be an integer");

        // add id to options
        options.id = parseInt(id);
      } else {
        throw new Error("invalid request parameters");
      }
    }

    // get members that match search queries
    const members = await db.getMembers(options);
    ctx.body = {members: members};
  } catch (error) {
    ctx.body = {error: error.message};
  }
});

module.exports = router;