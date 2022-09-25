import React, { useRef } from "react";
import styled from "styled-components";
import { ReactComponent as CloseBtn } from "../../assets/imgs/CloseBtn.svg";
import Button from "../Button";
import ReactDom from "react-dom";

const PuppyInfoEdit = ({ isPuppyShow, closeModal }) => {
  const nameRef = useRef();
  if (!isPuppyShow) return null;

  return ReactDom.createPortal(
    <PuppyInfoEditContainer>
      <Overlay onClick={closeModal}>
        <InfoForm onClick={(e) => e.stopPropagation()}>
          <Close onClick={closeModal}>
            <CloseBtn />
          </Close>
          <div className='group'>
            <label htmlFor='name'>이름</label>
            <input type='text' id='name' ref={nameRef}></input>
          </div>
          <div className='group'>
            <label htmlFor='breed'>견종</label>
            <input type='text' id='breed'></input>
          </div>
          <div className='group'>
            <label htmlFor='age'>나이</label>
            <input type='text' id='age'></input>
          </div>
          <div className='group'>
            <label htmlFor='gender'>성별</label>
            <input type='text' id='gender'></input>
          </div>
          <Button text={"등록/수정하기"} type={"mypageBtn"}></Button>
        </InfoForm>
      </Overlay>
    </PuppyInfoEditContainer>,
    document.getElementById("modal")
  );
};

export default PuppyInfoEdit;

const PuppyInfoEditContainer = styled.div`
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
