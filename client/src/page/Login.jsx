import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { postLogin } from "../api/utils";
import { ReactComponent as Google } from "../assets/imgs/Google.svg";
import { ReactComponent as Kakao } from "../assets/imgs/Kakao.svg";
import { ReactComponent as Naver } from "../assets/imgs/Naver.svg";
import axios from "axios";

import useAuthStore from "../store/authStore";
import { REST_API_KEY, REDIRECT_URI, GOOGLE_CLIENT_ID } from "../secretData";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const navigate = useNavigate();
  const { token } = useAuthStore();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    await postLogin(email, password);
    // await signIn(email, password);
    //≈setToken("hihhihi");
    // console.log(token);
  };

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: GOOGLE_CLIENT_ID,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (res) => {
    const profile = res.getBasicProfile();
    const userdata = {
      email: profile.getEmail(),
      image: profile.getImageUrl(),
      name: profile.getName(),
    };
    // 로그인 성공 후 실행하기 원하는 코드 작성.
    console.log(res);
    // console.log(profile);
    // console.log(userdata);
    sessionStorage.setItem("token", res.accessToken);
    axios({
      method: "post",
      url: `백엔드 구글 엔드포인트추가`,
      data: res.accessToken,
    });
    navigate("/socialsuccess");
  };

  const onFailure = (res) => {
    // alert("구글 로그인에 실패하였습니다");
    console.log("err", res);
  };

  return (
    <div>
      <Header />
      <LoginContainer>
        <HeaderLogo>
          <Link to={"/"}>
            <span>Puppy Buddy</span>
          </Link>
        </HeaderLogo>
        <InputForm>
          <h1>로그인</h1>
          <form onSubmit={submitHandler}>
            <div className='group'>
              <label htmlFor='email'>이메일</label>
              <input
                type='email'
                id='email'
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                // value={email}
                required
              ></input>
            </div>
            <div className='group'>
              <label htmlFor='password'>비밀번호</label>
              <input
                type='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                // value={password}
                required
                autoComplete='off'
              ></input>
            </div>
            <button className='btn'>로그인</button>
            <Link to={"/signup"}>
              <button className='btn'>회원가입</button>
            </Link>
          </form>
          <section>
            <div className='diveder'>
              <hr />
              <span>OR</span>
              <hr />
            </div>
            {/* <img src={kakao}></img>
            <img src={google}></img> */}
            <div className='social_btn'>
              <button className='kakaoBtn' onClick={kakaoLogin}>
                <Kakao />
              </button>
              {/* <button className='social'>
                <Naver />
              </button> */}
              <GoogleLogin
                className='googleBtn'
                clientId={GOOGLE_CLIENT_ID}
                buttonText='' // 버튼에 뜨는 텍스트
                onSuccess={onSuccess}
                onFailure={onFailure}
                // cookiePolicy={"single_host_origin"}
              />
            </div>
          </section>
        </InputForm>
      </LoginContainer>
    </div>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 60px;
  width: 100%;
  max-width: 100%;
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

  section {
    display: flex;
    flex-direction: column;
    width: 90%;

    .diveder {
      display: flex;
      align-items: center;
      justify-content: center;
      color: black;
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;

      hr {
        width: 100%;
        border: none;
        height: 0.5px;
        background-color: #979797;
      }
      span {
        text-transform: uppercase;
        font-weight: 600;
        margin: 0px 16px;
      }
    }

    svg {
      pointer-events: none;
    }

    .social_btn {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }
    .kakaoBtn {
      background-color: #fafafa;
      margin: 0;
      border-bottom: 0px;
      padding: 0px 0px;
      width: 48px;
      height: 48px;
    }
    .googleBtn {
      margin: 0px 0px;
      width: 48px;
      height: 48px;
      border-radius: 100% !important;

      & div {
        width: 48px;
        height: 48px;
        border-radius: 100% !important;

        & svg {
          /* width: 20px;
          height: 50px; */
          margin: 5px 1px 0px 5px;
        }
      }
    }
  }
`;
