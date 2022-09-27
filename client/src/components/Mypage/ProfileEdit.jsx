import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button";
import ReactDom from "react-dom";
import { ReactComponent as CloseBtn } from "../../assets/imgs/CloseBtn.svg";
import { useState } from "react";
import axios from "axios";

const ProfileEdit = ({
  isProfileShow,
  closeModal,
  headerData,
  setHeaderData,
}) => {
  const nameRef = useRef();
  const [nickname, setNickname] = useState(headerData.nickname);
  const [email, setEmail] = useState(headerData.email);

  if (!isProfileShow) return null;

  const InfoHandler = (e) => {
    // e.preventDefault();

    axios({
      method: "patch",
      url: "http://localhost:3001/signup",
      data: {
        nickname: nickname,
      },
    }).then((res) => setHeaderData(res));
  };

  return ReactDom.createPortal(
    <ProfileEditContainer>
      <Overlay onClick={closeModal}>
        <InfoForm onClick={(e) => e.stopPropagation()} onSubmit={InfoHandler}>
          <Close onClick={closeModal}>
            <CloseBtn />
          </Close>
          <div className='group'>
            <label htmlFor='name'>닉네임</label>
            <input
              type='text'
              id='name'
              ref={nameRef}
              defaultValue={headerData.nickname}
              onChange={(e) => setNickname(e.target.value)}
            ></input>
          </div>
          <div className='group'>
            <label htmlFor='email'>이메일</label>
            <input
              type='email'
              id='email'
              defaultValue={headerData.email}
              disabled
            ></input>
          </div>
          <Button text={"수정하기"} type={"mypageBtn"}></Button>
        </InfoForm>
      </Overlay>
    </ProfileEditContainer>,
    document.getElementById("modal")
  );
};

export default ProfileEdit;

const ProfileEditContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  backdrop-filter: blur(2px);
  display: grid;
  place-items: center;
`;
const Close = styled.div`
  width: 25px;
  cursor: pointer;
  margin-bottom: 10px;
`;
const InfoForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  z-index: 2;
  padding: 32px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  width: 380px;

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
`;
