// configure express
const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(express.static(path.join(__dirname, 'build')));

// configure cors
app.use(cors({
  credentials: true,
  origin: ['https://accomplice.us', 'https://www.accomplice.us', 'https://api.accomplice.us']
}))

// serve static files
app.use(express.static('public'));

// configure express subdomain
const subdomain = require('express-subdomain');

// api router
const apiRouter = require('./routes/apiRouter');
app.use(subdomain('api', apiRouter));

// index router
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 4431);
console.log('Listening on port 4431');