import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/",

  // baseURL: process.env.REACT_APP_DB_HOST,
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json; charset=UTF-8;";
    config.headers["Authorization"] = "토큰값";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    console.log(error);
    // if (error?.response) {
    //   console.log("No Server Response", error.response);
    // } else if (error.response.status === 400) {
    //   console.log("Missing Email or Password");
    // } else if (error.response.status === 401) {
    //   console.log("Inauthorized");
    // } else {
    //   console.log("Login Failed");
    // }
  }
);

export default instance;
