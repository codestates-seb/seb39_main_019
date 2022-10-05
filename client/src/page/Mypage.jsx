import React from "react";
import styled, { css } from "styled-components";
import Layout from "../components/Layout/Layout";
import MypageProfile from "../components/Mypage/MypageProfile";
import MypageSidebar from "../components/Mypage/MypageSidebar";
import { phone } from "../assets/style/Theme";

const Mypage = () => {
  return (
    <Layout
      child={
        <MypageContainer>
          <MypageHeaderPart>
            <MypageProfile />
            <Diveder />
          </MypageHeaderPart>
          <MypageBodyPart>
            <MypageSidebar />
          </MypageBodyPart>
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
  ${phone(css`
    width: 90%;
  `)}
`;

const MypageBodyPart = styled.div`
padding-bottom: 90px;
`;
