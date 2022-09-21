import instance from "./core/default";
import axios from "axios";

// const getbody = () => {
//   return instance({ url: "login" });
// };

const postLogin2 = (email, password) => {
  instance({
    method: "post",
    url: "http://localhost:3001/user",
    data: {
      email: email,
      password: password,
    },
  });
};

const postLogin = (email, password) => {
  axios({
    method: "post",
    url: "http://localhost:3001/user",
    data: {
      email: email,
      password: password,
    },
  }).then((response) => {
    console.log(response);
    localStorage.setItem("token", response.data);
  });
};

const postRegister = (nickname, regiEmail, regiPassword) => {
  axios({
    method: "post",
    url: "http://localhost:3001/signup",
    data: {
      nickname: nickname,
      email: regiEmail,
      password: regiPassword,
    },
  });
};

export { postLogin, postRegister };
