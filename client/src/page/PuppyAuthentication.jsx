import React from "react";
import styled from "styled-components";
import Header from "../components/Header";

const PuppyAuthentication = () => {
  return (
    <div>
      <PAuthContainer>
        <h1>반려견 정보 등록</h1>
      </PAuthContainer>
    </div>
  );
};

export default PuppyAuthentication;

const PAuthContainer = styled.div``;
