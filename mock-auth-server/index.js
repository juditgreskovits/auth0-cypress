const path = require('path');
const url = require('url');
const minimist = require('minimist');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const https = require('https');
const mock = require('./mock');

const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
  passphrase: 'eurostar',
};

const app = express();

const args = minimist(process.argv.slice(2));
// get port and callback url from cli args
const port = args.port;
const callbackUrl = args.callbackUrl;

// parse regular form submission bodies
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Mock Auth0 server');
});

const authorize = (req, res) => {
  // callbar url is passed as an argument to the app
  if (callbackUrl) {
    // construct redirect url from argument
    const outgoing = url.parse(callbackUrl);
    // return code to the client via the callback - this will be used to request a token
    outgoing.query = {
      code: mock.code,
      state: mock.state, // optional
    };
    // redirecting back to the client of the application
    res.status(302).redirect(outgoing.format());
  } else {
    res.status(200).send(
      JSON.stringify({
        code: mock.code,
        state: mock.state,
      })
    );
  }
};

// allow both GET and POST for fetching { code, state }
app.get('/authorize', urlencodedParser, authorize);
app.post('/authorize', urlencodedParser, authorize);

// return { access_token, id_token } when the code matches
app.post('/oauth/token', urlencodedParser, (req, res) => {
  if (req.body.code === mock.code && req.body.redirect_uri === callbackUrl) {
    res.status(200).send(JSON.stringify(mock.tokens));
  } else {
    res.status(401).send('Unauthorized');
  }
});

// return the user
app.get('/userinfo', urlencodedParser, (req, res) => {
  if (req.query.access_token === mock.tokens.access_token) {
    res.status(200).send(JSON.stringify(mock.profile));
  } else {
    res.status(401).send('Unauthorized');
  }
});

https.createServer(httpsOptions, app).listen(port, error => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> Mock Auth0 server listening on 127.0.0.1:${port}.`);
  }
});
