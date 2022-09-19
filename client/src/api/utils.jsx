import instance from "./core/default";

const postLogin = (email, password) => {
  instance({
    method: "post",
    url: "api/auth/login",
    data: {
      email: email,
      password: password,
    },
  });
};

export { postLogin };
