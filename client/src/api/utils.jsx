import instance from "./core/default";
import axios from "axios";

const postLogin = (email, password) => {
  axios({
    method: "post",
    url: "http://localhost:3001/user",
    data: {
      "email": email,
      "password": password
    },
  });
};

export { postLogin };
