import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Google } from "../assets/imgs/Google.svg";
import { ReactComponent as Kakao } from "../assets/imgs/Kakao.svg";
import { ReactComponent as Naver } from "../assets/imgs/Naver.svg";
import axios from "axios";
import Button from "../components/Button";
import useAuthStore from "../store/authStore";
import { REST_API_KEY, REDIRECT_URI, GOOGLE_CLIENT_ID } from "../secretData";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const { token } = useAuthStore();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "api/auth/login",
      // url: "http://localhost:3001/user",
      data: {
        email: email,
        password: password,
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        console.log("access_token:", response.data);
        console.log(response.headers["set-cookie"]);

        // localStorage.setItem("refresh_token", response.data);
        sessionStorage.setItem("access_token", response.data);
      })
      .catch((err) => console.log("err", err));
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
    navigate("/puppyauthentication");
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
            <div>
              <Button text={"로그인"} type={"auth"}></Button>
            </div>

            <Link to={"/signup"}>
              <Button text={"회원가입"} type={"auth"}></Button>
            </Link>
          </form>
          <section>
            <div className='diveder'>
              <hr />
              <span>OR</span>
              <hr />
            </div>
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
      background: #fafafa;
      border: 0;
      margin: 0;
      border-bottom: 0px;
      padding: 0px 0px;
      width: 48px;
      height: 48px;
      border-color: #fafafa;
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
