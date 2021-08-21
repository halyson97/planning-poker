import axios from 'axios';

import config from '../config/config';

const instance = axios.create({
  baseURL: config.urlServer,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});

export default instance;
