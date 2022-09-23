import instance from "./core/default";


// const getbody = () => {
//   return instance({ url: "login" });
// };

//서버 테스트용
const postLogin2 = (email, password) => {
  instance({
    method: "post",
    url: "/api/auth/login",
    data: {
      email: email,
      password: password,
    },
  });
};

const postLogin = (email, password) => {
  axios({
    method: "post",
    url: "http://43.200.20.180:8080/auth/login",
    data: {
      email: email,
      password: password,
    },
  }).then((response) => {
    console.log(response);
    localStorage.setItem("token", response.data);
  });
};

//서버 테스트용
const postRegister1 = (nickname, regiEmail, regiPassword) => {
  instance({
    method: "post",
    url: "/api/auth/signup",
    data: {
      nickname: nickname,
      email: regiEmail,
      password: regiPassword,
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

