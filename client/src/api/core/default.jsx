import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/",

  // baseURL: process.env.REACT_APP_DB_HOST,
});

let token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

instance.interceptors.request.use(
  async (config) => {
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["Authorization"] = `Bearer ${tokens?.access}`;

    if (token.length === 0) return config;
    const response = await axios.post(`${baseURL}/api/token/refresh/`, {
      refresh: token.refresh,
    });
    localStorage.setItem("token", JSON.stringify(response.data));

    setAuthTokens(response.data);

    config.headers.Authorization = `Bearer ${response.data.access}`;
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
