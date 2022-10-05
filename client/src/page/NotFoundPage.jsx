import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { ReactComponent as Error } from "../assets/imgs/Error.svg";

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <Error />
      <Title>원하시는 페이지를 찾을 수 없습니다.</Title>
      <Text>입력하신 페이지의 주소가 정확한지 다시 한번 확인해주세요.</Text>
      <Link to={"/main"}>
        <Button text={"메인 페이지로 가기"} type={"mypage"}></Button>
      </Link>
    </NotFoundContainer>
  );
};

export default NotFoundPage;

const NotFoundContainer = styled.div`
  margin: 50px;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 600;
`;

const Text = styled.p`
  margin: 20px 0;
  font-size: 25px;
`;
