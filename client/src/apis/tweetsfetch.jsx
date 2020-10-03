import axios from './axios';

function getAllTweets() {
  return new Promise((resolve, reject) => {
    try {
      const response = axios.get('/tweets/');
      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
}

export default getAllTweets;
