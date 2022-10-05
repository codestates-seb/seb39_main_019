import React from "react";
import styled from "styled-components";
import useScroll from "../../hooks/useScroll";
import Sec4_1 from "../../assets/imgs/Sec4_1.png";
import Sec4_2 from "../../assets/imgs/Sec4_2.png";
import icon1 from "../../assets/imgs/icon1.png";
import icon2 from "../../assets/imgs/icon2.png";
import icon3 from "../../assets/imgs/icon3.png";
import { Link } from "react-router-dom";

const Section4 = () => {
  const { scrollY } = useScroll();

  return (
    <FourContainer>
      <TextBox className={scrollY > 2170 ? "on" : "off"}>
        <span>이웃과 함께 하는</span>
        <span>동네 산책</span>
        <p>우리 동네에는 어떤 산책메이트가 있을지 찾아보세요!</p>
        <TextImg>
          <div>
            <img src={icon1} />
            <p>안전한 인증</p>
            <span>소유자 이름 & 등록번호</span>
            <span>반려견을 등록할 수 있어요.</span>
          </div>
          <div>
            <img src={icon2} />
            <p>간편한 기능</p>
            <span>간단한 등록으로</span>
            <span>산책메이트를 찾아보세요!</span>
          </div>
          <div>
            <img src={icon3} />
            <p>해시 태그</p>
            <span># 해시태그 기능으로</span>
            <span>카테고리별로 찾아보세요.</span>
          </div>
        </TextImg>
        <Link to="/main">
          <button>우리 동네글 보러가기</button>
        </Link>
      </TextBox>
      <ImgBox>
        <img className="img1" src={Sec4_1} />
        <img className="img2" src={Sec4_2} />
      </ImgBox>
    </FourContainer>
  );
};

export default Section4;

const FourContainer = styled.div`
  position: relative;
  margin-bottom: -100px;
  width: 100%;
  padding: 0 5vw;
  height: 800px;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
`;
const TextBox = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-right: 100px;
  text-align: center;
  @media screen and (max-width: 741px){
    text-align: center;
    width: 100%;
    padding-right: 0px;
  }

  & > span {
    font-family: GmarketSansMedium;
    font-size: 50px;
    font-weight: 700;
    white-space: nowrap;
    @media screen and (max-width: 543px){
      font-size: 40px;
    }
  }
  & p {
    margin-top: 10px;
    @media screen and (max-width: 543px){
      font-size: 15px;
    }
  }
  button {
    margin-top: 20px;
    background-color: #6bcbeec5;
    padding: 10px 20px;
    color: #fff;
    font-size: 20px;
    border: none;
    border-radius: 30px;
    transition: 0.3s;
    &:hover {
      color: #fff;
      background-color: #62bbdb;
      /* border: 1px solid #8bd5f0; */
    }
    @media screen and (max-width: 741px){
    width: 90%;
    }
  }
  .on {
  }
  .off {
  }
`;
const TextImg = styled.div`
  display: flex;
  margin-top: 30px;
  @media screen and (max-width: 741px){
  justify-content: center;
 }
  & div {
    margin-right: 10px;
    & img{
      @media screen and (max-width: 543px){
      width: 40px;
    }
    }
    & p {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
      @media screen and (max-width: 543px){
      font-size: 14px;
     }
    }
    & span {
      display: block;
      white-space: nowrap;
      font-size: 14px;
      @media screen and (max-width: 543px){
      font-size: 11px;
    }
    }
  }
`;

const ImgBox = styled.div`
  /* width: 100%; */
  display: flex;

  & img {
    max-width: 350px;
    width: 30%;
    @media screen and (max-width: 1300px){
      width: 25%;
    }
    @media screen and (max-width: 741px){
    display: none;
    }
  }
  .img1 {
    position: absolute;
    right: 25vw;
    top: 10%;
    @media screen and (max-width: 1300px){
      right: 10vw;
      top: 20%;
    }
  }
  .img2 {
    position: absolute;
    right:15vw;
    top: 20%;
    z-index: 10;
    @media screen and (max-width: 1300px){
      right: 0vw;
      top: 30%;
    }
  }
`;
