import instance from "./core/default";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const postLogin2 = (email, password) => {
  axios({
    method: "post",
    url: "/api/auth/login",
    data: {
      email: email,
      password: password,
    },
  });
};

const postPpAuth = (ppOwner, regiNumber) => {
  const navigate = useNavigate();
  instance({
    method: "post",
    url: "/v1/dogs/validation",
    data: {
      owner_nm: ppOwner,
      dog_reg_no: regiNumber,
    },
  });
};

const getPpinfor = () => {
  instance({
    method: "get",
    url: "v1/dogs/info/1",
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
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
    withCredentials: true,
  });
};

export { postPpAuth, postRegister, postLogin2, getPpinfor };
