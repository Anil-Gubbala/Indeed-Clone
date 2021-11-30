import Axios from 'axios';
import config from './consts';
import store from '../reducers/store';
import { showError } from '../reducers/actions';

// Axios.defaults.withCredentials = true;

// Axios.defaults.headers = {
//   // 'Access-Control-Allow-Credentials': true,
//   // 'Access-Control-Allow-Origin': '*',
// };

const get = (path, data) => {
  // Axios.defaults.headers.common.authorization = localStorage.getItem(
  //   config.TOKEN
  // );
  return Axios.get(config.SERVERURL + path, { params: data })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response && error.response.data.err) {
        store.dispatch(showError(error.response.data.err));
        throw error.response.data.err;
      } else {
        store.dispatch(showError('Server Side Error Occured'));
        throw 'Server Side Error Occured';
      }
    });
};

const post = (path, data) =>
  // Axios.defaults.headers.common.authorization = localStorage.getItem(config.TOKEN);
  // Axios.defaults.headers.common.authorization = null;
  Axios.post(config.SERVERURL + path, data, { mode: 'cors' })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response && error.response.data.err) {
        store.dispatch(showError(error.response.data.err));
        throw error.response.data.err;
      } else {
        store.dispatch(showError('Server Side Error Occured'));
        throw 'Server Side Error Occured';
      }
    });

const put = (path, data) =>
  // Axios.defaults.headers.common.authorization = localStorage.getItem(config.TOKEN);
  // Axios.defaults.headers.common.authorization = null;
  Axios.put(config.SERVERURL + path, data, { mode: 'cors' })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response && error.response.data.err) {
        store.dispatch(showError(error.response.data.err));
        throw error.response.data.err;
      } else {
        store.dispatch(showError('Server Side Error Occured'));
        throw 'Server Side Error Occured';
      }
    });
export { get, post };
