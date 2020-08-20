// configure express
const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');

// configure cors
app.use(cors({
  credentials: true,
  origin: ['http://accomplice.us', 'http://www.accomplice.us', 'http://api.accomplice.us']
}))

// serve static files
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'build')));

// configure express subdomain
const subdomain = require('express-subdomain');

// api router
const apiRouter = require('./routes/apiRouter');
app.use(subdomain('api', apiRouter));

// index router
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 4431);
console.log('Listening on port 4431');