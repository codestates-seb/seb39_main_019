import React from "react";
import Layout from "../components/Layout/Layout";
import styled from "styled-components";
import PuppyInfoPost from "../components/Mypage/PuppyInfoPost";

const PuppyInfoPage = () => {
  return (
    <Layout
      child={
        <PuppyInfoPageContainer>
          <PuppyInfoPost />
        </PuppyInfoPageContainer>
      }
    />
  );
};

export default PuppyInfoPage;

const PuppyInfoPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
