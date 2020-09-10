// api router
const Router = require('koa-router');
const router = new Router();
const db = require('../../private/db');
const file = require('../../private/file');

router.post('/members', async ctx => {
  // add member to database
  const id = await db.addMember(ctx);

  // create member avatar
  await file.uploadAvatar(ctx, id);

  ctx.redirect('/members');
});

module.exports = router;