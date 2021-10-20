import axios from "axios";
import {store} from '../redux/store'
// const qs = require('query-string')

//base url
axios.defaults.baseURL='http://localhost:3000'


// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
    store.dispatch({type:'changeLoading',payLoad:true})
    return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  store.dispatch({type:'changeLoading',payLoad:false})
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
//login
export async function reqLogin(values) {
  return axios({
    method: "post",
    url: "/login",
    data:values
  })

}

//get product category
export async function reqProductCate() {
  return axios({
    method: "get",
    url: "/products/category"
  })

}
