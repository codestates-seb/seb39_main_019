import React from "react";
import styled from "styled-components";
import { Link, Route, Routes, NavLink } from "react-router-dom";
import MypageWrote from "./MypageWrote";
import MypageLike from "./MypageLike";
import Button from "../Button";

export default function Home() {
  return (
    <SContentsWrapper>
      <SHomeContentsWrapper>
        <SHomeContentsLink to='/mypage/wrote'>관심있어요</SHomeContentsLink>
        <SHomeContentsLink to='/mypage/like'>즐겨찾기</SHomeContentsLink>
      </SHomeContentsWrapper>
      <Routes>
        <Route path='wrote' element={<MypageWrote />} />
        <Route path='like' element={<MypageLike />} />
      </Routes>
    </SContentsWrapper>
  );
}

const SContentsWrapper = styled.div`
  margin: 20px;
`;

const SHomeContentsWrapper = styled.div`
  margin: 30px 0 0 0;
  display: flex;
`;

const SHomeContentsLink = styled(NavLink)`
  color: white;
  padding: 0 20px;
  font-size: 20px;
  font-weight: 500;

  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
  &:hover {
    color: #5bccf5c5;
  }
  &.active {
    color: #53bbe1c5;
    position: relative;
    top: 2px;

    font-weight: 900;
    /* background-color: #2565d0; */
  }
`;
