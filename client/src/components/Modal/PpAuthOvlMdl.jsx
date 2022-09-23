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
        <ModalBtn>반려견 정보 등록하기</ModalBtn>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ModalBtn = styled.button`
  padding: 12px 24px;
  margin: 2px 0 20px 0;
  width: 50%;
  border: 0;
  border-radius: 5px;
`;