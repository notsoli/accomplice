// configure koa
const Koa = require('koa');
const app = new Koa();

// node middleware
const path = require('path');

// koa middleware
const staticDir = require('koa-static');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const bodyClean = require('koa-body-clean');
const mount = require('koa-mount');

// configure cors
app.use(cors({
  credentials: true,
  origin: ['https://accomplice.us', 'https://www.accomplice.us', 'https://api.accomplice.us']
}))

// configure body parser
app.use(koaBody({
  formidable: {uploadDir: './data/images/temp'},
  multipart: true
}));
app.use(bodyClean());

// configure build
const build = new Koa();
build.use(staticDir(__dirname + "/build"));
app.use(mount("/", build));

// serve static files
app.use(staticDir(path.join(__dirname, 'public')));
app.use(staticDir(path.join(__dirname, 'data')));

// configure express subdomain
const Subdomain = require('koa-subdomain');
const subdomain = new Subdomain();

// api router
const apiRouter = require('./routes/apiRouter');
subdomain.use('api', apiRouter.routes());
app.use(subdomain.routes());

// post router
const postRouter = require('./routes/postRouter');
app.use(postRouter.routes());

app.listen(process.env.PORT || 4431);
console.log('Listening on port 4431');