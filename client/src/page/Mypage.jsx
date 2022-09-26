import React from "react";
import Header from "../components/Header";
import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import MypageProfile from "../components/Mypage/MypageProfile";
const Mypage = () => {
  return (
    <Layout
      child={
        <MypageContainer>
          <MypageHeaderPart>
            <MypageProfile />
            <Diveder />
          </MypageHeaderPart>
          <MypageBodyPart></MypageBodyPart>
        </MypageContainer>
      }
    />
  );
};

export default Mypage;

const MypageContainer = styled.div`
  padding: 15px 15px;
  max-width: 1024px;
  margin: 0 auto;
`;

const MypageHeaderPart = styled.div``;
const Diveder = styled.div`
  margin: 20px;
  width: 100%;
  border: none;
  height: 0.5px;
  background-color: #979797;
`;

const MypageBodyPart = styled.div``;
