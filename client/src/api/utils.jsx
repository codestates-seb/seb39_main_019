import instance from "./core/default";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// const getbody = () => {
//   return instance({ url: "login" });
// };

//서버 테스트용
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
  })
    .then((response) => {
      console.log(response);
      navigate("/PuppyInfoPost");
    })
    .then((res) =>
      toast.success("인증 완료 🎉 반려견 정보를 등록해주세요", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      })
    )
    .catch((err) => {
      // const navigate = useNavigate();
      console.log(err);
      navigate("/main");
      // toast.error("인증 실패! 중복되거나 유효하지 않은 반려견 정보입니다", {
      //   autoClose: 3000,
      //   position: toast.POSITION.TOP_RIGHT,
      //   hideProgressBar: true,
      // });
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
