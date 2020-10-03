const callbackURL = process.env.CALLBACK_URL
  ? process.env.CALLBACK_URL
  : 'http://127.0.0.1:8080/twitter/callback';

const TWITTER_CONFIG = {
  consumerKey: 'ooCxPZGrOO19n20A84yXGnRHQ',
  consumerSecret: 'GT1WwWb6kfgJihH2vxCmryz0Cd92CWO3Tl9Vuw3vySe1AeMXgL',
  consumerToken: '1152347495306915840-J7meIjrm4yuCWXc6zr0fijAmZPcyph',
  consumerTokenSecret: 'ODtrMbJgtgUGHJs1VqDSDCy6mtKbJjy70badHGOBxEAPb',
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
