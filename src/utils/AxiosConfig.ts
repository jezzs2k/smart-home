import axios from 'axios';
import {URL_DEV} from '../config';

const axiosInstance = axios.create({
  baseURL: URL_DEV,
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    console.log('Axios Error:', error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log('Axios Error:', error);
  },
);

export default axiosInstance;
