// api router
const Router = require('koa-router');
const router = new Router();
const db = require('../../private/db');

router.get('/getProjects', async ctx => {
  try {
    // create options object
    const options = {};
    for (const option in ctx.request.query) {
      if (option === "name") {
        // add name to options
        options.name = {$regex: ctx.request.query[option], $options: 'i'};
      } else if (option === "member") {
        options.member = parseInt(ctx.request.query[option]);
      } else if (option === "tags") {
        options.tags = {$all: ctx.request.query[option].split(',')}
      } else {
        throw new Error("invalid request parameters");
      }
    }

    const projects = await db.getProjects(options);
    ctx.body = {projects: projects};
  } catch (error) {
    ctx.body = {error: error.message};
  }
});

module.exports = router;