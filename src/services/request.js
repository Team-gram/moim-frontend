import axios from "axios";
// import store from "@/store";

// create an axios instance
const service = axios.create({
  baseURL: "", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000, // request timeout
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    console.log(response);
    if(response.status==200)
      return response;
    else{
      alert(response.status)
    }
    return null;
  },
  (error) => {
    if (error.response.status === 401) {
      return error;
    }
    console.log(error.response);
    console.log(error); // for debug
    console.log(Promise.reject(error));
    return Promise.reject(error);
  }
);

export default service;