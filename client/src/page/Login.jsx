import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Kakao } from "../assets/imgs/Kakao.svg";
import axios from "axios";
import Button from "../components/Button";
import { REST_API_KEY, REDIRECT_URI, GOOGLE_CLIENT_ID } from "../secretData";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import Swal from "sweetalert2";
import { phone } from "../assets/style/Theme";
import useUserInfo from "../store/userinfo";
import instance from "../api/core/default";

const Login = () => {
  const { setUserInfo, setUserId, setUserNickName, setUserEmail } =
    useUserInfo();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const kakaoLogin2 = (e) => {
    e.preventDefault();
    window.location.href =
      "http://43.200.20.180:8080/oauth2/login/callback/kakao";
    // navigate("/oauth2/login/callback/kakao");
    console.log(response.headers);
    // let accessToken = new URL(location.href).searchParams.get("access_token");
    // let refreshToken = new URL(location.href).searchParams.get("refresh_token");
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(response.headers);

    // useEffect(() => {}, []);
    // fetch(`api/oauth2/login/callback/kakao`)
    //   .then((res) => res.json())
    //   .then((res) => console.log(res))
    //   .then((err) => console.log(err));
    // axios
    //   .get(`api/oauth2/login/callback/kakao`)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // axios
    //   .get(
    //     `http://43.200.20.180:8080/oauth2/login/callback/kakao?code=hBrjkBXjmwVZJ0XQ2ONbK1PugI9jqqpeqrwKQF3hY5ZrcVRuehbno94GUzw9N75YV13jQwopb1QAAAGDnhqqAw&state=0m0HkhI8uF9mdER1ULPoVLuleVUPzWoOY2NupSfpHpg%3D`
    //   )
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // window.location.href =
    //   "http://43.200.20.180:8080/oauth2/login/callback/kakao";
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
    // let accessToken = new URL(location.href).searchParams.get("access_token");
    // let refreshToken = new URL(location.href).searchParams.get("refresh_token");
    // console.log(accessToken);
    // console.log(refreshToken);
    // localStorage.setItem("accessToken", accessToken);
    // localStorage.setItem("refreshToken", refreshToken);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;
    axios
      .post("api/auth/login", { email, password })
      .then((response) => {
        localStorage.setItem("refresh_token", response.data.refresh_token);
        sessionStorage.setItem("access_token", response.data.access_token);

        instance({
          method: "get",
          url: "/api/me",
        })
          .then((response) => {
            console.log(response);
            setUserNickName(response.nickname);
            setUserEmail(response.email);
            setUserId(response.memberId);

            console.log(response.nickname, response.email, response.memberId);

            if (response.memberCertificate === "DOG_OWNER") {
              navigate("/main");
            } else {
              navigate("/puppyauthentication");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          text: "로그인 실패!",
        });
      });
  };

  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;

    // let code = new URL(window.location.href).searchParams.get("code");
    // // let code = new URL(window.location.href);

    // console.log(code);
    // axios
    //   .get(`/oauth2/login/callback/kakao?code=${code}`)
    //   .then((res) => console.log(res));
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
    sessionStorage.setItem("g_access_token", res.accessToken);
    axios({
      method: "post",
      url: `백엔드 구글 엔드포인트추가`,
      data: res.accessToken,
    });
    navigate("/puppyauthentication");
  };

  const onFailure = (res) => {
    Swal.fire({
      icon: "warning",
      text: "구글 로그인에 실패하였습니다",
      width: "400px",
    });
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
                // required
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
              <button className='kakaoBtn' onClick={kakaoLogin2}>
                <Kakao />
              </button>
              {/* <button className='kakaoBtn' onClick={kakaoLogin}>
                <Kakao />
              </button> */}
              {/* <button className='social'>
                <Naver />
              </button> */}
              <GoogleLogin
                className='googleBtn'
                clientId={GOOGLE_CLIENT_ID}
                buttonText='' // 버튼에 뜨는 텍스트
                onSuccess={onSuccess}
                // onFailure={onFailure}
                // cookiePolicy={"single_host_origin"}//
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
  background-color: ${(props) => props.theme.HeaderColor};
  box-shadow: rgba(0, 0, 0, 0.14902) 0px 1px 1px 0px,
    rgba(0, 0, 0, 0.09804) 0px 1px 2px 0px;
  border-radius: 10px;
  ${phone(css`
    width: 300px;
    font-size: 10px;
  `)}

  h1 {
    margin-bottom: 50px;
  }
  .group {
    margin-bottom: 30px;
  }
  input {
    font-size: 18px;
    padding: 10px 90px 10px 5px;
    -webkit-appearance: none;
    display: block;
    background-color: transparent;
    color: ${(props) => props.theme.textColor};
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
      border-radius: 100%;
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
          margin: 5px 1px 0px 5px;
        }
      }
    }
  }
`;
