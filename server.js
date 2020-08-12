// configure express
const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

// serve static files
app.use(express.static('public'));

// configure express subdomain
const subdomain = require('express-subdomain');

// api router
const apiRouter = require('./routes/apiRouter');
app.use(subdomain('api', apiRouter));

// index router
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
console.log('Listening on port 8080!');