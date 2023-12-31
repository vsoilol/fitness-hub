import Axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import { getToken } from './auth';
import { backendURL } from './constants';

const backend = Axios.create({
  timeout: 30000,
  baseURL: backendURL
  // eslint-disable-next-line
  //adapter: cacheAdapterEnhancer(Axios.defaults.adapter as any)
});

backend.interceptors.request.use(config => {
  // show request in console during development
  if (process.env.NODE_ENV === 'development') {
    console.info('✉️ ', config.method?.toUpperCase() + ' ' + config.url);
  }
  config.headers = {
    Authorization: `Bearer ${getToken()}`
  };
  return config;
});

backend.interceptors.response.use(
  config => config,
  error => {
    return Promise.reject(error.response.data);
  }
);

export default backend;
