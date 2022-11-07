import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_KEY}`,
  // baseURL: "http://localhost:3001/",
  // baseURL: process.env.REACT_APP_DB_HOST,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
  // headers: {
  //   "Content-Type": "application/json; charset=utf-8",
  // },
  // config.headers["Content-Type"] = "application/json; charset=utf-8";
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; //여기는 accessToken
    }
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
    const { config, response, status } = error;
    if (status === 401) {
      if (error.response.data.message === "TokenExpiredError") {
        const originalRequest = config; // 어떤 요청이 실패
        const refreshToken = localStorage.getItem("refreshToken");
        // token refresh 요청
        const { data } = axios.post(
          `${baseURL}/api/token/refresh/`, // token refresh api
          {
            refreshToken,
          }
        );
        // 새로운 토큰 저장
        sessionStorage.setItem("newAccessToken", data.accessToken);
        localStorage.setItem("newRefreshToken", data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance.request(originalRequest);
        // // 새로운 토큰 저장
        // const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        //   data;
        // localStorage.multiSet([
        //   ["accessToken", newAccessToken],
        //   ["refreshToken", newRefreshToken],
        // ]);
        // axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        // originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        // return axios(originalRequest);
      } else {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
