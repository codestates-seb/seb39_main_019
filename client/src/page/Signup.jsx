import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Login from "./Login";
import axios from "axios";
import Button from "../components/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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
  const [errMsg, setErrMsg] = useState("");

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
        toast.error("중복된 닉네임이나 이미 존재하는 이메일입니다", {
          autoClose: 3000,
          hideProgressBar: true,
        });
      });
  };

  useEffect(() => {
    if (success) {
      navigate("/login");
      toast.success("회원가입을 축하합니다 !", {
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  }, [success, navigate]);

  return (
    <div>
      <ToastContainer />
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
  width: 400px;
  padding: 48px 32px 32px 32px;
  border: 1px solid #ebebeb;
  box-shadow: rgba(0, 0, 0, 0.14902) 0px 1px 1px 0px,
    rgba(0, 0, 0, 0.09804) 0px 1px 2px 0px;

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
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    line-height: 20px;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    letter-spacing: 1px;
    border: 0;
    transition: all 0.15s ease;
    background: #59c8f0c5;
    border-radius: 5px;
    text-shadow: 1px 1px 0 rgba(39, 110, 204, 0.5);
  }
`;
