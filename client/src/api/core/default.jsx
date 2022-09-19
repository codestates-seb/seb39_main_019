import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/",

  // baseURL: process.env.REACT_APP_DB_HOST,
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["Authorization"] = "토큰 값";
    return config;
  },
  (error) => {
    console.log(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    console.log(error);
  }
);

export default instance;
