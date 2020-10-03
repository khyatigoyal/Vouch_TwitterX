// const callbackURL = 'http://127.0.0.1:8080/twitter/callback'; //development
const callbackURL =
  'https://desolate-basin-58635.herokuapp.com/twitter/callback'; //production
const TWITTER_CONFIG = {
  consumerKey: '9kF5BU4GIcgctNlKAgVTSMCn8',
  consumerSecret: 'LL6XVUYqULWkxlX5yv86vhlBNzZBH9RR1mFFs5KBxCBNwr425F',
  consumerToken: '1152347495306915840-NEEHuhawaN2FQ1N6uDnPPPKN5oN00U',
  consumerTokenSecret: 'SA7ebf5XnedKaU1GHS3QbnTMb1kJ1CtsOXTYPBftE5Cyv',
  callbackURL: callbackURL,
};

const MONGODB = {
  MONGODB_URI: `mongodb+srv://khyatigoyal:khyatigoyal@cluster0.yk513.mongodb.net/vouchdb?retryWrites=true&w=majority`,
};

const CONFIG = {
  ...TWITTER_CONFIG,
  ...MONGODB,
};
module.exports = CONFIG;
