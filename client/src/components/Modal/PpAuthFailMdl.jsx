import React from "react";
import styled from "styled-components";
import Button from "../Button";

const PpAuthFailMdl = () => {
  return (
    <PpAuthFailMdlContainer>
      <ModalMsg>
        <span>인증 실패🚫</span>
        <span>유효한 반려견 정보를 입력해주세요.</span>
      </ModalMsg>
    </PpAuthFailMdlContainer>
  );
};

export default PpAuthFailMdl;

const PpAuthFailMdlContainer = styled.div`
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
