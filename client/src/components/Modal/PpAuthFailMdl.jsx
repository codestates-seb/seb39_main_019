import React from "react";
import styled from "styled-components";
import Button from "../Button";
import { createPortal } from "react-dom";

const PpAuthFailMdl = () => {
  return createPortal(
    <PpAuthFailMdlContainer>
      <ModalMsg>
        <span>인증 실패🚫</span>
        <span>중복되거나 유효하지 않은 반려견 정보입니다.</span>
        <span>다시 작성해주세요.</span>
      </ModalMsg>
    </PpAuthFailMdlContainer>,
    document.getElementById("modal")
  );
};

export default PpAuthFailMdl;

const PpAuthFailMdlContainer = styled.div`
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
