import axios from "axios";
// import store from "@/store";

// create an axios instance
const service = axios.create({
  baseURL: "http://ec2-52-78-104-79.ap-northeast-2.compute.amazonaws.com:8080", //"https://dev-api-bgl.geeksloft.com", // url = base url + request url
  // baseURL: "http://127.0.0.1:8000",
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000, // request timeout
});

service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    // const token = store.getters.getToken;

    // if (token) {
    //   // let each request carry token
    //   config.headers.Authorization = token;
    // }
    // console.log("config: " + config);
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
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    console.log(response);
    return response;
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