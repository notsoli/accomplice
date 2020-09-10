// api router
const Router = require('koa-router');
const router = new Router();

// getProjects api endpoint
const getProjects = require('./api/getProjects');
router.use(getProjects.routes());

// getMembers api endpoint
const getMembers = require('./api/getMembers');
router.use(getMembers.routes());

module.exports = router;