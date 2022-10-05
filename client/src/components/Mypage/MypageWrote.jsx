import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import instance from "../../api/core/default";
import MypageWroteItem from "../Mypage/MypageWroteItem";
import Swal from "sweetalert2";

const MypageWrote = () => {
  const [wroteView, setwroteView] = useState([]);

  useEffect(() => {
    instance({
      method: "get",
      url: "/api/me/posts",
    })
      .then((response) => {
        setwroteView(response.sort((a, b) => b.postId - a.postId));
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          text: "글을 불러올 수 없습니다.",
          width: "290px",
        });
      });
  }, []);

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
