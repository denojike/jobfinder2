import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = JSON.parse(token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export { setAuthToken };
