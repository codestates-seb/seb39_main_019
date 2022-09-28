import React from "react";
import Header from "../components/Header";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { REST_API_KEY, REDIRECT_URI, PUPPY_API_KEY } from "../secretData";
import styled from "styled-components";
import Signup from "./Signup";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import Button from "../components/Button";
import PpAuthDoneMdl from "../components/Modal/PpAuthDoneMdl";
import PpAuthFailMdl from "../components/Modal/PpAuthFailMdl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "../store/authStore";
// import { postPpAuth } from "../api/utils";

const PuppyAuthentication = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [api, setApi] = useState("");
  const [ppOwner, setPpOwner] = useState("");
  const [regiNumber, setRegiNumber] = useState("");
  const ppOwnerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split("=")[1];
  const { isLogin } = useAuthStore();

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  // const getKakaoToken = () => {
  //   fetch(`https://kauth.kakao.com/oauth/token`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data) {
  //         sessionStorage.setItem("token", data.access_token);
  //         localStorage.setItem("token", data.refresh_token);
  //       } else {
  //         navigate("/");
  //       }
  //     });
  // };

  // //1 토큰 보내기
  const getKakaoToken = () => {
    axios({
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: `https://kauth.kakao.com/oauth/token`,
      data: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    }).then((response) => {
      console.log("kakaotoken:", response);
      if (response.data) {
        sessionStorage.setItem("token", response.data.access_token);
        localStorage.setItem("token", response.data.refresh_token);
        const kakaoAccessToken = response.data.access_token;
        const kakaoRefreshToken = response.data.refresh_token;
      } else {
        navigate("/");
      }
    });
  };

  // const postKakaoToken = () => {
  //   axios({
  //     method: "post",
  //     url: `백엔드 엔드포인트추가`,
  //     data: kakaoAccessToken, kakaoRefreshToken,
  //   });
  // };

  //2 토큰보내기
  const getKakaoToken2 = () => {
    axios({
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: `https://kauth.kakao.com/oauth/token`,
      data: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    }).then((response) => {
      console.log(response);
      if (response.data) {
        const kakaoAccessToken = response.data.access_token;
        const kakaoRefreshToken = response.data.refresh_token;

        axios.post("백엔드 엔드포인트", {
          kakaoAccessToken,
          kakaoRefreshToken,
        });
      } else {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    if (!location.search) return;
    getKakaoToken();
    // postKakaoToken();
  }, []);

  useEffect(() => {
    if (api.includes("item")) {
      console.log("!");
    } else {
      console.log("?");
    }
    console.log(api);
  }, [api]);

  const apiHandler = (e) => {
    e.preventDefault();
    axios
      .get(
        `/dog/animalInfo?serviceKey=${PUPPY_API_KEY}`,
        {
          params: {
            // [encodeURIComponent(`serviceKey`)]: `${PUPPY_API_KEY}`,
            dog_reg_no: `${regiNumber}`,

            owner_nm: `${ppOwner}`,
          },
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.warn(err));

    var xhr = new XMLHttpRequest();
    var url =
      "http://apis.data.go.kr/1543061/animalInfoSrvc/animalInfo"; /*URL*/
    var queryParams =
      "?" +
      encodeURIComponent("serviceKey") +
      "=" +
      `${PUPPY_API_KEY}`; /*Service Key*/
    queryParams +=
      "&" +
      encodeURIComponent("dog_reg_no") +
      "=" +
      encodeURIComponent(`${regiNumber}`); /**/
    // queryParams +=
    //   "&" + encodeURIComponent("rfid_cd") + "=" + encodeURIComponent(""); /**/
    queryParams +=
      "&" +
      encodeURIComponent("owner_nm") +
      "=" +
      encodeURIComponent(`${ppOwner}`); /**/
    xhr.open("GET", url + queryParams);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        return setApi(JSON.stringify(this.responseText));
      }
    };
    const result = xhr.send("");
    console.log(result);
  };

  const apiBtnHandler = (e) => {
    e.preventDefault();
    // postPpAuth(ppOwner, regiNumber);

    let token = sessionStorage.getItem("access_token") || "";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .post("api/v1/dogs/validation", {
        owner_nm: ppOwner,
        dog_reg_no: regiNumber,
      })
      .then((response) => {
        console.log(response); /*<PpAuthDoneMdl /> */
        /*navigate("/PpAuthDoneMdl")*/

        toast.success("인증 완료 🎉 반려견 정보를 등록해주세요", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
        });
        navigate("/PuppyInfoPost"); // 이 부분 수정해야함
      })
      .catch((err) =>
        /*navigate("/ppauthfailmdl")*/ /* <PpAuthFailMdl />*/
        {
          console.log(err);
          navigate("/main");
          toast.error(
            "인증 실패🚫 중복되거나 유효하지 않은 반려견 정보입니다",
            {
              autoClose: 3000,
              position: toast.POSITION.TOP_RIGHT,
              hideProgressBar: true,
            }
          );
        }
      );

    // axios({
    //   method: "POST",
    //   url: "api/v1/dogs/validation",
    //   data: { owner_nm: ppOwner, dog_reg_no: regiNumber },
    //   headers: {`Bearer ${token}`},
    // })
    //   .then((response) => {
    //     console.log(response); /*<PpAuthDoneMdl /> */
    //     /*navigate("/PpAuthDoneMdl")*/

    //     toast.success("인증 완료 🎉 반려견 정보를 등록해주세요", {
    //       position: toast.POSITION.TOP_RIGHT,
    //       autoClose: 3000,
    //       hideProgressBar: true,
    //     });
    //     navigate("/PuppyInfoPost"); // 이 부분 수정해야함
    //   })
    //   .catch((err) =>
    //     /*navigate("/ppauthfailmdl")*/ /* <PpAuthFailMdl />*/
    //     {
    //       console.log(err);
    //       navigate("/main");
    //       toast.error(
    //         "인증 실패🚫 중복되거나 유효하지 않은 반려견 정보입니다",
    //         {
    //           autoClose: 3000,
    //           position: toast.POSITION.TOP_RIGHT,
    //           hideProgressBar: true,
    //         }
    //       );
    //     }
    //   );
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <SocialModalContainer>
        <HeaderLogo>
          <Link to={"/"}>
            <span>Puppy Buddy</span>
          </Link>
        </HeaderLogo>
        {/* <div className='modalMain'>
        축하드려요! 가입되었습니다. PuppyBuddy에서 행복한 하루되세요!
      </div> */}
        <InputForm>
          <h1>견주 인증</h1>
          <form /*</InputForm>*/ onSubmit={apiBtnHandler}>
            <div className='group'>
              <label htmlFor='ppOwner'>소유자</label>
              <input
                type='text'
                id='ppOwner'
                onChange={(e) => setPpOwner(e.target.value)}
                required
                // value={ppOwner}
                ref={ppOwnerRef}
              ></input>
            </div>
            <div className='group'>
              <label htmlFor='regiNumber'>등록번호</label>
              <input
                type='text'
                id='regiNumber'
                onChange={(e) => setRegiNumber(e.target.value)}
                required
                value={regiNumber}
              ></input>
            </div>
            <Button text={"인증하기"} type={"auth"}></Button>
          </form>
        </InputForm>
      </SocialModalContainer>
    </div>
  );
};

export default PuppyAuthentication;

const SocialModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  /* form {
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
    } */
  /* } */
`;

const HeaderLogo = styled.div`
  /* padding-left: 20px; */
  margin-bottom: 20px;
  & span {
    font-family: KOTRAHOPE;
    font-weight: bold;
    font-size: 35px;
    color: ${(props) => props.theme.HeLogoColor};
    cursor: pointer;
    white-space: nowrap;
  }
`;

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 380px;
  padding: 48px 32px 32px 32px;
  background: #fafafa;
  border: 1px solid #ebebeb;
  box-shadow: rgba(0, 0, 0, 0.14902) 0px 1px 1px 0px,
    rgba(0, 0, 0, 0.09804) 0px 1px 2px 0px;

  h1 {
    margin-bottom: 50px;
    color: black;
  }
  .group {
    margin-bottom: 30px;
  }
  input {
    font-size: 18px;
    padding: 10px 90px 10px 5px;
    -webkit-appearance: none;
    display: block;
    background: #fafafa;
    color: #636363;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #757575;
  }

  input:focus {
    outline: none;
  }

  label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
  }
`;
