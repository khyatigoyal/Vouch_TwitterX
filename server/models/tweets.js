const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tweetsSchema = new Schema({
  tweets: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

var tweets = mongoose.model('tweets', tweetsSchema);
module.exports = tweets;
