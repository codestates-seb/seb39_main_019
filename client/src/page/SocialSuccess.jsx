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

const SocialSuccess = () => {
  const [ppOwner, setPpOwner] = useState("");
  const [regiNumber, setRegiNumber] = useState("");
  const ppOwnerRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split("=")[1];

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

  const apiHandler = (e) => {
    e.preventDefault();

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
    queryParams +=
      "&" + encodeURIComponent("rfid_cd") + "=" + encodeURIComponent(""); /**/
    queryParams +=
      "&" +
      encodeURIComponent("owner_nm") +
      "=" +
      encodeURIComponent(`${ppOwner}`); /**/
    queryParams +=
      "&" +
      encodeURIComponent("owner_birth") +
      "=" +
      encodeURIComponent(""); /**/
    queryParams +=
      "&" + encodeURIComponent("_type") + "=" + encodeURIComponent(""); /**/
    xhr.open("GET", url + queryParams);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        alert(
          "Status: " +
            this.status +
            "nHeaders: " +
            JSON.stringify(this.getAllResponseHeaders()) +
            "nBody: " +
            this.responseText
        );
      }
    };
    xhr.send("");
  };

  // const apiHandler = (e) => {
  //   e.preventDefault();
  //   axios({
  //     method: "GET",
  //     url: `http://apis.data.go.kr/1543061/animalInfoSrvc/animalInfo`,
  //     data: {
  //       dog_reg_no: `${regiNumber}`,
  //       owner_nm: `${ppOwner}`,
  //       serviceKey: `${PUPPY_API_KEY}`,
  //     },
  //   }).then((response) => {
  //     console.log("hi");
  //     console.log(response);
  //   });
  // };

  // const apiHandler = (e) => {
  //   e.preventDefault();
  //   axios({
  //     method: "GET",
  //     url: `http://apis.data.go.kr/1543061/animalInfoSrvc/animalInfo`,
  //     data: `dog_reg_no=${regiNumber}&owner_nm=${ppOwner}&serviceKey=${PUPPY_API_KEY}`,
  //   }).then((response) => {
  //     console.log("hi");
  //     console.log(response);
  //   });
  // };

  return (
    <div>
      <Header />
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
          <form onSubmit={apiHandler}>
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
                type='number'
                id='regiNumber'
                onChange={(e) => setRegiNumber(e.target.value)}
                required
                value={regiNumber}
              ></input>
            </div>
            <button>인증하기</button>
          </form>
        </InputForm>
      </SocialModalContainer>
    </div>
  );
};

export default SocialSuccess;

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
  }
`;

const HeaderLogo = styled.div`
  /* padding-left: 20px; */
  margin-bottom: 20px;
  & span {
    /* font-family: yg_jalnan; */
    font-weight: 700;
    font-size: 35px;
    color: ${(props) => props.theme.HeLogoColor};
    cursor: pointer;
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

  button {
    padding: 12px 24px;
    margin: 2px 0 20px 0;
    width: 100%;
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    line-height: 20px;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    letter-spacing: 1px;
    border: 0;
    border-bottom: 2px solid #2fa88ac5;
    transition: all 0.15s ease;
    background: #3cd5aec5;
    border-radius: 5px;
    text-shadow: 1px 1px 0 rgba(39, 110, 204, 0.5);
  }
  .btn:focus {
    outline: 0;
  }

  .btn:hover {
    background: #2fa88ac5;
  }
`;
