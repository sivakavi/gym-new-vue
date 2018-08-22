import axios from 'axios'
import { eventHub } from '../shared/eventHub'


const axiosinstance =  axios.create({
  baseURL: process.env.API,
  //timeout: 9000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Header': 'Origin, Content-Type, X-Requested-With, Accept, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Origin',
    'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT,DELETE,PATCH',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})


// Add a request interceptor
axiosinstance.interceptors.request.use(function (config) {
  var localAuthToken = localStorage.authtoken;
  if(localAuthToken){
    config.headers.Authorization = 'Bearer '+ localAuthToken;
  }
  eventHub.$emit('before-request');
  return config;
}, function (error) {
  eventHub.$emit('request-error');
  return Promise.reject(error);
});


// Add a response interceptor
axiosinstance.interceptors.response.use(function (response) {
  eventHub.$emit('after-response');
  return response;
}, function (error) {
  eventHub.$emit('response-error');
  return Promise.reject(error);
});


export default axiosinstance