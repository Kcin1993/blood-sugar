import axios from 'axios';
import * as R from 'ramda';

const url = R.equals(process.env.NODE_ENV, 'development')
  ? 'http://localhost:8080'
  : null;

const clientRequest = () => {
  return axios.create({
    baseURL: url,
    timeout: 5000
  });
};

export default clientRequest;
