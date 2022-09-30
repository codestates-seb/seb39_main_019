import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button";
import ReactDom from "react-dom";
import { ReactComponent as CloseBtn } from "../../assets/imgs/CloseBtn.svg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuthStore from "../../store/authStore";

const ProfileEdit = ({
  isProfileShow,
  closeModal,
  headerData,
  setHeaderData,
}) => {
  const nameRef = useRef();
  const [nickname, setNickname] = useState(headerData.nickname);
  const [email, setEmail] = useState(headerData.email);
  const navigate = useNavigate();
  const { setIsLogin, isPpAuth } = useAuthStore();
  let token = sessionStorage.getItem("access_token") || "";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  if (!isProfileShow) return null;

  const InfoHandler = () => {
    axios({
      method: "patch",
      url: "api/api/me",
      data: {
        nickname: nickname,
      },
    }).then((res) => setHeaderData(res));
  };

  const WithdrawalHandler = () => {
    Swal.fire({
      icon: "warning",
      title: "회원탈퇴하시겠습니까?",
      text: "다시 되돌릴 수 없습니다.",
      showDenyButton: true,
      confirmButtonText: "네",
      denyButtonText: "아니요",
      width: "400px",
      height: "400px",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios({
          method: "delete",
          url: "api/api/me",
        }).then((res) => {
          console.log(res);
          localStorage.clear();
          sessionStorage.clear();
        });
        Swal.fire("그동안 이용해주셔서 감사합니다.", "", "success");
        setIsLogin();
        navigate("/");
      } else if (result.isDenied) {
        Swal.fire("회원탈퇴가 되지 않았어요.", "", "info");
      }
    });
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
          <WithdrawalBtn onClick={WithdrawalHandler}>회원탈퇴</WithdrawalBtn>
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

const WithdrawalBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-size: 10px;
  text-decoration: underline;
  cursor: pointer;
  color: #636363;
`;
