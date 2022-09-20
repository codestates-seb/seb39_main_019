import instance from "./core/default";
import axios from "axios";

// const getbody = () => {
//   return instance({ url: "login" });
// };

const postLogin = (email, password) => {
  axios({
    method: "post",
    url: "http://localhost:3001/user",
    data: {
      email: email,
      password: password,
    },
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
