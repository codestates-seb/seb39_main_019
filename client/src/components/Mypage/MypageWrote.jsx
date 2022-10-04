import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import instance from "../../api/core/default";
import MypageWroteItem from "../Mypage/MypageWroteItem";

const MypageWrote = () => {
  const [wroteView, setwroteView] = useState([]);
  // const img = wroteView.imgUrl;

  useEffect(() => {
    instance({
      method: "get",
      url: "/api/me/posts",
    })
      .then((response) => {
        console.log(response);
        setwroteView(response);
        // console.log(response.imgUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(wroteView[0].imgUrl);
  // console.log(wroteView[1].imgUrl);

  return (
    <MypageWroteContainer>
      {wroteView.length ? (
        <MypageWroteYes>
          {wroteView.map((it) => (
            <MypageWroteItem {...it} key={it.postId} />
          ))}
        </MypageWroteYes>
      ) : (
        <MypageWroteNo>작성한 글이 없어요</MypageWroteNo>
      )}
    </MypageWroteContainer>
  );
};

export default MypageWrote;

const MypageWroteContainer = styled.div`
  margin: 20px;
`;
const MypageWroteYes = styled.div``;
const MypageWroteNo = styled.div``;
