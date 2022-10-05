import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import { useNavigate, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import axios from "axios";
import Button from "../components/Button";
import Swal from "sweetalert2";
import { phone } from "../assets/style/Theme";

const PuppyAuthentication = () => {
  const [ppOwner, setPpOwner] = useState("");
  const [regiNumber, setRegiNumber] = useState("");
  const ppOwnerRef = useRef(null);
  const navigate = useNavigate();

  const apiBtnHandler = (e) => {
    e.preventDefault();

    let token = sessionStorage.getItem("access_token") || "";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .post("api/v1/dogs/validation", {
        owner_nm: ppOwner,
        dog_reg_no: regiNumber,
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: "반려견 정보를 입력해주세요",
          width: "300px",
        });
        navigate("/mypage");
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          text: "이미 인증된 등록번호이거나 유효하지 않은 등록번호입니다.",
          width: "300px",
          height: "250px",
        });
      });
  };

  return (
    <div>
      <Header />
      <SocialModalContainer>
        <HeaderLogo>
          <Link to={"/"}>
            <span>Puppy Buddy</span>
          </Link>
        </HeaderLogo>
        <InformMsg>
          입력하신 동물 등록 번호는 해당 번호의 중복 가입을 방지하기 위한
          용도로만 사용되며 회원 탈퇴 시 파기됩니다.
        </InformMsg>
        <InputForm>
          <h1>견주 인증</h1>
          <form onSubmit={apiBtnHandler}>
            <div className='group'>
              <label htmlFor='ppOwner'>소유자</label>
              <input
                type='text'
                id='ppOwner'
                onChange={(e) => setPpOwner(e.target.value)}
                required
                ref={ppOwnerRef}
              ></input>
            </div>
            <div className='group'>
              <label htmlFor='regiNumber'>등록번호</label>
              <input
                type='text'
                id='regiNumber'
                onChange={(e) => setRegiNumber(e.target.value)}
                required
                value={regiNumber}
              ></input>
            </div>
            <Button text={"인증하기"} type={"auth"}></Button>
          </form>
        </InputForm>
      </SocialModalContainer>
    </div>
  );
};

export default PuppyAuthentication;

const SocialModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

const InformMsg = styled.div`
  margin-bottom: 40px;
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
`;
