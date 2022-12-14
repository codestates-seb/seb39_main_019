import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { phone } from "../../assets/style/Theme";

const MypageWroteItem = ({ title, imgUrl, postId }) => {
  return (
    <MypageWroteItemContainer>
      <Link to={`/main/${postId}`}>
        <ItemContainer>
          <ItemInner>
            <ImgBox>
              <img src={imgUrl} />
            </ImgBox>
            <TextBox>
              <Title>{title}</Title>
            </TextBox>
          </ItemInner>
        </ItemContainer>
      </Link>
    </MypageWroteItemContainer>
  );
};

export default MypageWroteItem;

const MypageWroteItemContainer = styled.div`
  width: calc(50% - 30px);
  /* width: 100%; */
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  /* background-color: ${(props) => props.theme.HeaderColor}; 
 box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px; */
  transition: 0.3s;
  &:hover {
    transform: scale(1.07);
  }

  ${phone(css`
    width: 100%;
  `)}
`;

const ItemContainer = styled.div``;
const ItemInner = styled.div`
  padding: 10px;
`;
const ImgBox = styled.div`
  & img {
    width: 100%;
    height: 300px;
    border-radius: 5px;
    /* object-fit: cover; */
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
