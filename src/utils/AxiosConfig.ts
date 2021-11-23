import axios from 'axios';
import {URL_DEV} from '../config';

const axiosInstance = axios.create({
  baseURL: URL_DEV,
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {},
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {},
);

export default axiosInstance;
