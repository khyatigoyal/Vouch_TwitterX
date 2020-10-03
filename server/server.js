const express = require('express');
const http = require('http');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const socketio = require('socket.io');
const { Strategy: TwitterStrategy } = require('passport-twitter');
var tweetsRouter = require('./routers/tweetsRoute');

const TWITTER_CONFIG = {
  consumerKey: config.consumerKey,
  consumerSecret: config.consumerSecret,
  callbackURL: config.callbackURL,
};
mongoose.connect(
  config.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to mongo db');
  }
);

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(passport.initialize());

app.use(cors());

app.use(
  session({
    secret: 'KeyboardKittens',
    resave: true,
    saveUninitialized: true,
  })
);

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

passport.use(
  new TwitterStrategy(
    TWITTER_CONFIG,
    (accessToken, refreshToken, profile, cb) => {
      const user = {
        name: profile.username,
        photo: profile.photos[0].value.replace(/_normal/, ''),
      };
      cb(null, user);
    }
  )
);

const twitterAuth = passport.authenticate('twitter');

const addSocketIdToSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
};

app.use('/tweets', tweetsRouter);
app.get('/twitter', addSocketIdToSession, twitterAuth);

app.get('/twitter/callback', twitterAuth, (req, res) => {
  io.in(req.session.socketId).emit('user', req.user);
  res.end();
});

server.listen(process.env.PORT || 8080, () => {
  console.log('listening...');
});
