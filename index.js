const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const app = express();
const port = 8080;

const strategy = new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL:  '/callback',
}, (accessToken, refreshToken, extraParams, profile, done) =>
  done(null, profile));

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });

passport.use(strategy);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'auth0-secret' }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/',
  (req, res) => req.user
    ? res.send(`<h1>Hello ${req.user.name.givenName}!</h1>`)
    : res.send(`<h1>Hello world!</h1>
      <div><a href="/login">Login</a></div>`));

app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/login' }),
  (req, res) => res.redirect("/"));

app.get('/login',
  passport.authenticate('auth0', { scope: 'openid email profile' }),
  (req, res) => res.redirect('/'));

app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  else {
    console.info(`==> app listening on 127.0.0.0:${port}`);
  }
});
