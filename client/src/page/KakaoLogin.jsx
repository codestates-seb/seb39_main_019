import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { REST_API_KEY, REDIRECT_URI } from "../secretData";
import styled from "styled-components";
import Signup from "./Signup";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

//이 페이지는 아마도 메인에 있어야할지도...?

const KakaoLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split("=")[1];

  const getKakaoToken = () => {
    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
        } else {
          navigate("/");
        }
      });
  };

  // const getKakaoToken = () => {
  //   axios({
  //     method: "post",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     url: `https://kauth.kakao.com/oauth/token`,
  //     data: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
  //   }).then((response) => {
  //     console.log(response);
  //     if (response.data) {
  //       sessionStorage.setItem("token", response.data.access_token);
  //       localStorage.setItem("token", response.data.refresh_token);
  //     } else {
  //       navigate("/");
  //     }
  //   });
  // };

  // useEffect(() => {
  //   if (!location.search) return;
  //   getKakaoToken();
  // }, []);

  return (
    <SocialModalContainer>
      <div className='modalHeader'>
        <h2>PuppyBuddy</h2>
      </div>
      <div className='modalMain'>
        축하드려요! 가입되었습니다. PuppyBuddy에서 행복한 하루되세요!
      </div>
    </SocialModalContainer>
  );
};

export default KakaoLogin;

const SocialModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .modalHeader {
    margin: 10px;
  }
  .modalMain {
    margin: 10px;
  }
`;
