import { useState } from "react";
import styled from "styled-components";
import useStore from "../store/globalStore";

const ToggleContainer = styled.div`
  position: relative;
  /* left: 10%; */
  margin-left: 10px;
  cursor: pointer;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: #47a300c5;
    transition: 0.5s;
    // TODO : .toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현합니다.
    &.toggle--checked {
      background-color: #7d7d7d;
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
  const { isDark, setIsDark } = useStore();
  const toggleHandler = () => {
    setIsDark();
  };

  return (
    <>
      <ToggleContainer onClick={toggleHandler}>
        <div
          className={
            !isDark ? "toggle-container" : "toggle-container toggle--checked"
          }
        />
        <div
          className={
            !isDark ? "toggle-circle" : "toggle-circle toggle--checked"
          }
        ></div>
      </ToggleContainer>
    </>
  );
};
