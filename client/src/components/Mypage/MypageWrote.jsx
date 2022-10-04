import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import instance from "../../api/core/default";

const MypageWrote = () => {
  const [wroteView, setwroteView] = useState([]);
  // const img =
  //   "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG";

  useEffect(() => {
    instance({
      method: "get",
      url: "/api/me/posts?page=0&size=4",
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .get("http://localhost:3001/content")
    //   .then((response) => response.data)
    //   .then((data) => setwroteView(data));
  }, []);
  return (
    <MypageWroteContainer>
      {wroteView.length ? (
        <MypageWroteYes>
          {wroteView.map((it) => (
            <Link to={`/main/${it.id}`} key={it.id}>
              <ItemContainer>
                <ItemInner>
                  <ImgBox>
                    {/* <img src="https://via.placeholder.com/240x220"/> */}
                    {/* <img src="https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG"/> */}
                    <div style={{ backgroundImage: `url(${img})` }} />
                  </ImgBox>
                  <TextBox>
                    <Title>{it.title}</Title>
                  </TextBox>
                </ItemInner>
              </ItemContainer>
            </Link>
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
const ItemContainer = styled.div`
  width: 100%;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  /* background-color: ${(props) => props.theme.HeaderColor}; 
   box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px; */
  transition: 0.3s;
  &:hover {
    transform: scale(1.07);
  }
`;
const ItemInner = styled.div`
  padding: 10px;
`;
const ImgBox = styled.div`
  & div {
    width: 100%;
    height: 220px;
    border-radius: 5px;
    background-image: url("image-url"); /* object-fit: cover; */
    background-repeat: no-repeat; // background-image가 컨테이너를 가득 채우지 못할 경우에도 반복하지 않는다.
    background-size: cover; // 사이즈가 container에 맞지 않아도 꽉 차도록 채운다.
    background-position: center; // background-image가 컨테이너에 가운데로 오도록 한다.
  }
`;
const TextBox = styled.div`
  margin-top: 10px;
  padding: 0px 5px;
`;
const Title = styled.div`
  font-family: GmarketSansMedium;
  font-size: 16px;
  margin-bottom: 5px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
