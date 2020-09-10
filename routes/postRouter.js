// post router
const Router = require('koa-router');
const router = new Router();

// members endpoint
const members = require('./post/members');
router.use(members.routes());

// projects endpoint
const projects = require('./post/projects');
router.use(projects.routes());

module.exports = router;