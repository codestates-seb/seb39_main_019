import React from "react";
import styled from "styled-components";
import { Link, Route, Routes } from "react-router-dom";
import MypageWrote from "./MypageWrote";
import MypageLike from "./MypageLike";

export default function Home() {
  return (
    <SContentsWrapper>
      <SHomeContentsWrapper>
        <SHomeContentsLink to='/mypage/wrote'>내가 쓴 글</SHomeContentsLink>
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

const SHomeContentsLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: #000;
  padding: 10px;
`;
