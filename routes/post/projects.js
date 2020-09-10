// api router
const Router = require('koa-router');
const router = new Router();
const db = require('../../private/db');
const file = require('../../private/file');

router.post('/projects', async ctx => {
  // add member to database
  const id = await db.addProject(ctx);

  // create member avatar
  await file.uploadImage(ctx, id);

  ctx.redirect('/projects');
});

module.exports = router;