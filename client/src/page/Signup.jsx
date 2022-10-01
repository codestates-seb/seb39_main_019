import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { phone } from "../assets/style/Theme";

// const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,20}$/;

const Signup = () => {
  const [nickname, setNickname] = useState("");
  const [regiEmail, setRegiEmail] = useState("");
  const [regiPassword, setRegiPassword] = useState("");
  const [matchRegiPassword, setMatchRegiPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [success, setSuccess] = useState(false);
  const nicknameRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    nicknameRef.current.focus();
  }, []);

  useEffect(() => {
    const match = regiPassword === matchRegiPassword;
    setValidMatch(match);
  }, [regiPassword, matchRegiPassword]);

  const regiSubmitHandler = async (e) => {
    e.preventDefault();

    // await postRegister(nickname, regiEmail, regiPassword);

    await axios({
      method: "post",
      url: "api/auth/signup",
      // url: "http://localhost:3001/signup",
      data: {
        nickname: nickname,
        email: regiEmail,
        password: regiPassword,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("memberId", res.data.memberId);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          text: "중복된 닉네임이나 이미 존재하는 이메일입니다",
          width: "290px",
          height: "300px",
        });
      });
  };

  useEffect(() => {
    if (success) {
      navigate("/login");
      Swal.fire({
        icon: "success",
        text: "회원가입을 축하합니다!",
        width: "290px",
        height: "300px",
      });
    }
  }, [success, navigate]);

  return (
    <div>
      <Header />
      <SignupContainer>
        <InputForm>
          <h1>회원가입</h1>
          <form onSubmit={regiSubmitHandler}>
            <div className='group'>
              <label htmlFor='nickname'>닉네임</label>
              <input
                type='text'
                id='nickname'
                ref={nicknameRef}
                onChange={(e) => setNickname(e.target.value)}
                required
                value={nickname}
              ></input>
            </div>
            <div className='group'>
              <label htmlFor='email'>이메일</label>
              <input
                type='email'
                id='email'
                onChange={(e) => setRegiEmail(e.target.value)}
                required
                value={regiEmail}
              ></input>
            </div>
            <div className='group'>
              <label htmlFor='password'>비밀번호</label>
              <input
                type='password'
                id='password'
                value={regiPassword}
                onChange={(e) => setRegiPassword(e.target.value)}
                required
              ></input>
            </div>
            <div className='group'>
              <label htmlFor='checkpassword'>
                비밀번호 확인
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchRegiPassword ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validMatch || !matchRegiPassword ? "hide" : "invalid"
                  }
                />
              </label>
              <input
                type='password'
                id='checkpassword'
                onChange={(e) => setMatchRegiPassword(e.target.value)}
                required
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              ></input>
              <p
                id='confirmnote'
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                비밀번호와 일치하지 않습니다.
              </p>
            </div>
            {/* <Button
                  text={"회원가입"}
                  type={"auth"}
                  disabled={!validMatch ? true : false}
                ></Button> */}

            <button className='btn' disabled={!validMatch ? true : false}>
              회원가입
            </button>
          </form>
        </InputForm>
      </SignupContainer>
    </div>
  );
};

export default Signup;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.HeaderColor};
  width: 400px;
  padding: 48px 32px 32px 32px;
  box-shadow: rgba(0, 0, 0, 0.14902) 0px 1px 1px 0px,
    rgba(0, 0, 0, 0.09804) 0px 1px 2px 0px;

  ${phone(css`
    width: 300px;
    font-size: 10px;
  `)}

  h1 {
    margin-bottom: 50px;
  }
  p {
    font-size: 0.9rem;
    color: red;
  }
  .group {
    margin-bottom: 30px;
  }
  input {
    font-size: 18px;
    padding: 7px 90px 10px 5px;
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
    font-weight: bold;
  }

  button {
    padding: 12px 24px;
    margin: 2px 0 20px 0;
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    line-height: 20px;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    letter-spacing: 1px;
    border: 0;
    transition: all 0.15s ease;
    border-radius: 5px;
    background-color: ${(props) => props.theme.HeLogoColor};
    color: ${(props) => props.theme.HeaderColor};

    &:hover {
      color: ${(props) => props.theme.textColor};
      background-color: ${(props) => props.theme.HeaderColor};
      border: 0.1px solid;
    }
  }
`;
