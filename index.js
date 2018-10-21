const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const app = express();
const port = process.env.PORT || 8080;

const strategy = new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  state: false,
  callbackURL:  '/callback',
}, (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
});


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
    ? res.send(`<div style="text-align: center; font-family: sans-serif;">
      <h1>Welcome ${req.user._json.given_name}!</h1>
      <p>Your email is ${req.user._json.email}</p>
      </div>`)
    : res.send(`<div style="text-align: center; font-family: sans-serif;">
      <h1>Please log in!</h1>
      <div><a href="/login" style="padding: 10px; border: 1px solid grey; color: black; text-decoration: none;">Press me!</a></div>
      </div>`));

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
    console.info(`==> app listening on http://local-kapotasana.com:${port}`);
  }
});
