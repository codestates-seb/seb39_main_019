import React from "react";
import styled from "styled-components";
import Button from "../Button";

const PpAuthDoneMdl = () => {
  return (
    <PpAuthDoneMdlContainer>
      <ModalMsg>
        <span>인증 완료 🎉</span>
        <span>반려견 정보를 등록해주세요</span>
      </ModalMsg>
      <ModalBtnCon>
        <Button text={"반려견 정보 등록하기"} type={"auth"}></Button>
      </ModalBtnCon>
    </PpAuthDoneMdlContainer>
  );
};

export default PpAuthDoneMdl;

const PpAuthDoneMdlContainer = styled.div`
  /* background-color: white; */
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  border: 2px solid;
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
