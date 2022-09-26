import React from "react";
import styled from "styled-components";
import Button from "../Button";

const PpAuthOvlMdl = () => {
  return (
    <PpAuthOvlMdlContainer>
      <ModalMsg>
        <span>인증 실패🚫</span>
        <span>중복된 반려견 정보입니다.</span>
      </ModalMsg>
      <ModalBtnCon>
        <Button text={"반려견 정보 등록하기"} type={"auth"}></Button>
      </ModalBtnCon>
    </PpAuthOvlMdlContainer>
  );
};

export default PpAuthOvlMdl;

const PpAuthOvlMdlContainer = styled.div`
  background-color: white;
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;
const ModalMsg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 20px;
`;

const ModalBtnCon = styled.div`
  padding: 0px 50px 0px 50px;
`;
