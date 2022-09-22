import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { REST_API_KEY, REDIRECT_URI } from "../secretData";
import styled from "styled-components";
import Signup from "./Signup";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";


const SocialSuccess = () => {
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

  // //1 인가데이터만 보내기
  const getKakaoToken = () => {
    axios({
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: `https://kauth.kakao.com/oauth/token`,
      data: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    }).then((response) => {
      console.log(response);
      if (response.data) {
        sessionStorage.setItem("token", response.data.access_token);
        localStorage.setItem("token", response.data.refresh_token);
      } else {
        navigate("/");
      }
    });
  };

  // const postKakaoToken = () => {
  //   axios({
  //     method: "post",
  //     url: `백엔드 엔드포인트추가`,
  //     data: `${KAKAO_CODE}`,
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

  // setTimeout(() => {
  //   // console.log("hi");
  //   navigate("/socialsuccess");
  // }, 3000);안됌

  return (
    <SocialModalContainer>
      <HeaderLogo>
          <Link to={"/"}>
            <span>Puppy Buddy</span>
          </Link>
        </HeaderLogo>
      <div className='modalMain'>
        축하드려요! 가입되었습니다. PuppyBuddy에서 행복한 하루되세요!
      </div>
    </SocialModalContainer>
  );
};

export default SocialSuccess;

const SocialModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  
  
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