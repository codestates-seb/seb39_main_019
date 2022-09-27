import axios from "axios";

const instance = axios.create({
  baseURL: "/api/auth/login",
  // baseURL: "http://localhost:3001/",
  // baseURL: process.env.REACT_APP_DB_HOST,
});

// let token = localStorage.getItem("token")
//   ? localStorage.getItem("token")
//   : null;

// let token = sessionStorage.getItem("access_token") || "";

instance.interceptors.request.use(
  async (config) => {
    console.log(config);
    const { token } = config.data;
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["Authorization"] = `Bearer ${token}`; //여기는 accessToken
    axios.defaults.withCredentials = true; //
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
    const { config, response: status } = error;
    if (status === 401) {
      if (error.response.data.message === "TokenExpiredError") {
        const originalRequest = config;
        const refreshToken = localStorage.getItem("refreshToken");
        // token refresh 요청
        const { data } = axios.post(
          `${baseURL}/api/token/refresh/`, // token refresh api
          {
            refreshToken,
          }
        );
        // 새로운 토큰 저장
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data;
        localStorage.multiSet([
          ["accessToken", newAccessToken],
          ["refreshToken", newRefreshToken],
        ]);
        axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
