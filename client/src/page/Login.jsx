import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { postLogin } from "../api/utils";
import { ReactComponent as Google } from "../assets/imgs/Google.svg";
import { ReactComponent as Kakao } from "../assets/imgs/Kakao.svg";
import { ReactComponent as Naver } from "../assets/imgs/Naver.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    await postLogin(email, password);
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
              <span>Or</span>
              <hr />
            </div>
            {/* <img src={kakao}></img>
            <img src={google}></img> */}
            <div className='social_btn'>
              <button className='social'>
                <Kakao />
              </button>
              <button className='social'>
                <Naver />
              </button>
              <button className='social'>
                <Google />
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
`;

const HeaderLogo = styled.div`
  padding-left: 20px;
  & span {
    font-family: yg_jalnan;
    font-weight: 700;
    font-size: 22px;
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
  margin: 4em auto;
  padding: 3em 2em 2em 2em;
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
    position: relative;
    display: inline-block;
    padding: 12px 24px;
    margin: 0.3em 0 1em 0;
    width: 100%;
    color: #fff;
    font-size: 16px;
    line-height: 20px;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    letter-spacing: 1px;
    border: 0;
    border-bottom: 2px solid #4db101c5;
    cursor: pointer;
    transition: all 0.15s ease;
    background: #47a300c5;
    text-shadow: 1px 1px 0 rgba(39, 110, 204, 0.5);
  }
  .btn:focus {
    outline: 0;
  }

  .btn:hover {
    background: #2f6b01c5;
  }
section{
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

    .social_btn{
      display: flex;
 
  /* border: 1px solid black; */
  
}
.social{
  background-color:#fafafa;
margin: 0;
border-bottom: 0px ;
/* border: 1px solid black; */
margin: 05px;
}
}

`;
