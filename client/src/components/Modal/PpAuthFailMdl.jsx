import React from "react";
import styled from "styled-components";
import Button from "../Button";
import { createPortal } from "react-dom";

const PpAuthFailMdl = () => {
  return createPortal(
    <PpAuthFailMdlContainer>
      <ModalMsg>
        <span>μΈμ¦ μ€ν¨π«</span>
        <span>μ€λ³΅λκ±°λ μ ν¨νμ§ μμ λ°λ €κ²¬ μ λ³΄μλλ€.</span>
        <span>λ€μ μμ±ν΄μ£ΌμΈμ.</span>
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
