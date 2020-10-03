const express = require('express');
const bodyParser = require('body-parser');
const Tweets = require('../models/tweets');
const tweetsRoute = express.Router();
tweetsRoute.use(bodyParser.json());
var Twitter = require('twitter');
const CONFIG = require('../config');
var client = new Twitter({
  consumer_key: CONFIG.consumerKey,
  consumer_secret: CONFIG.consumerSecret,
  access_token_key: CONFIG.consumerToken,
  access_token_secret: CONFIG.consumerTokenSecret,
});
tweetsRoute.get('/', (req, res) => {
  var todayDate = new Date();
  let tdd = todayDate.getDate();
  let tmm = todayDate.getMonth() + 1;
  if (tmm < 10) tmm = '0' + tmm;
  if (tdd < 10) tdd = '0' + tdd;
  let tyyyy = todayDate.getFullYear();

  var last7Date = new Date();
  last7Date.setDate(last7Date.getDate() - 7);

  let ldd = last7Date.getDate();
  let lmm = last7Date.getMonth() + 1;
  if (lmm < 10) lmm = '0' + lmm;
  if (ldd < 10) ldd = '0' + ldd;
  let lyyyy = last7Date.getFullYear();

  client.get(
    'search/tweets',
    {
      q: `a since:${lyyyy + '-' + lmm + '-' + ldd} until:${
        tyyyy + '-' + tmm + '-' + tdd
      }`,
      count: 100,
    },
    (error, data, response) => {
      if (error) res.send(error);
      const tweets = data;
      Tweets.remove({});
      let postTweets = new Tweets({ tweets });
      postTweets.save();

      res.send(postTweets);
    }
  );
});
tweetsRoute.post('/', async (req, res) => {
  Tweets.remove({});
  const { tweets } = req.body;

  let newTweetsData = new Tweets({ tweets });
  newTweetsData.save();
  res.send(newTweetsData);
});
module.exports = tweetsRoute;
