import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Kakao } from "../assets/imgs/Kakao.svg";
import axios from "axios";
import Button from "../components/Button";
import Swal from "sweetalert2";
import { phone } from "../assets/style/Theme";
import useUserInfo from "../store/userinfo";
import instance from "../api/core/default";

const Login = () => {
  const { setUserId, setUserNickName, setUserEmail } = useUserInfo();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    // axios.defaults.withCredentials = true;
    axios
      .post(
        `${import.meta.env.VITE_API_KEY}/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        localStorage.setItem("refresh_token", response.data.refresh_token);
        sessionStorage.setItem("access_token", response.data.access_token);

        instance({
          method: "get",
          url: "/api/me",
        })
          .then((response) => {
            setUserNickName(response.nickname);
            setUserEmail(response.email);
            setUserId(response.memberId);

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
          width: "290px",
        });
      });
  };

  const socialAlert = () => {
    Swal.fire({
      icon: "info",
      text: "준비중인 기능입니다",
    });
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
                required
              ></input>
            </div>
            <div className='group'>
              <label htmlFor='password'>비밀번호</label>
              <input
                type='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
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
              <button className='kakaoBtn' onClick={socialAlert}>
                <Kakao />
              </button>
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
