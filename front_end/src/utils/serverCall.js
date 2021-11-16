import Axios from 'axios';
import config from './consts';

Axios.defaults.withCredentials = true;

// Axios.defaults.headers = {
//   // 'Access-Control-Allow-Credentials': true,
//   // 'Access-Control-Allow-Origin': '*',
// };

const get = (path, data) => {
  Axios.defaults.headers.common.authorization = localStorage.getItem(config.TOKEN);
  return Axios.get(config.SERVERURL + path, { params: data })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.data.err) {
        throw error.response.data.err;
      } else {
        throw 'server side error';
      }
    });
};

const post = (path, data) =>
  // Axios.defaults.headers.common.authorization = localStorage.getItem(config.TOKEN);
  // Axios.defaults.headers.common.authorization = null;
  Axios.post(config.SERVERURL + path, data, { mode: 'cors' })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.data.err) {
        throw error.response.data.err;
      } else {
        throw 'server side error';
      }
    });
export { get, post };
