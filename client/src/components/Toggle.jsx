import { useState } from "react";
import styled from "styled-components";
import useGlobal from "../store/globalStore";

const ToggleContainer = styled.div`
  position: relative;
  /* left: 10%; */
  margin-left: 20px;
  cursor: pointer;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: #59c8f0c5;
    transition: 0.5s;
    // TODO : .toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현합니다.
    &.toggle--checked {
      background-color: #152642;
    }
  }

  > .toggle-circle {
    position: absolute;
    top: 2px;
    left: 3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #ffffff;
    transition: 0.5s;
    & div {
      position: absolute;
      /* margin-right: 10px; */
      font-size: 13px;
    }
    // TODO : .toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현합니다.
    &.toggle--checked {
      left: 27px;
    }
  }
`;

export const Toggle = () => {
  const { isLight, setIsLight } = useGlobal();


  const toggleHandler = () => {
     if(isLight===true){
      setIsLight()
       localStorage.setItem('theme','dark')
     }else{
      setIsLight()
       localStorage.setItem('theme','light')
     }
  };

  return (
    <>
      <ToggleContainer onClick={toggleHandler}>
        <div
          className={
            !isLight ?   "toggle-container toggle--checked":"toggle-container" 
          }
        />
        <div
          className={
            !isLight ?   "toggle-circle toggle--checked" :"toggle-circle" 
          }
        ></div>
      </ToggleContainer>
    </>
  );
};
