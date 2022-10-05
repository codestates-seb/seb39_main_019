import React from 'react'
import styled from 'styled-components'
import useScroll from '../../hooks/useScroll'
import Sec3_1 from '../../assets/imgs/Sec3_1.png'
import Sec3_2 from '../../assets/imgs/Sec3_2.png'
import {Link} from 'react-router-dom'

const Section3 = () => {

  const {scrollY} = useScroll()
  return (
    <ThreeContainer>
      <ImgBox>
        <div className={scrollY>1220?'on':'off'}>
          <img className='img1' src={Sec3_1}/>
          <img className='img2' src={Sec3_2}/>
        </div>
      </ImgBox>
      <TextBox>
        <span>견주인증 & 강아지를</span>
        <span>간편한 등록으로 안전하게 신속하게</span>
        <p>누구보다 편리하게 강아지들의 산책메이트를 찾아보세요 !</p>
        <div>
          <Link to={'/main'}><button>게시글 보기</button></Link>
          <Link to={'/login'}><button>댕댕이 등록하러 가기</button></Link>
        </div>
      </TextBox>
    </ThreeContainer>
  )
}

export default Section3

const ThreeContainer = styled.div`
  width: 100%;
  height: 900px;
  background-color: #6bcbeec5;
  display: flex;
  @media screen and (max-width: 741px){
  height: 500px;
  }
`
const ImgBox = styled.div`
width: 100%;
height: 100%;
position: relative;
@media screen and (max-width: 741px){
  display: none;
}
& div{
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
  & img{
    max-width: 450px;
    min-width: 280px;
  }
  .img1{
    position: absolute;
    width: 28vw;
    right: 30%;
  }
  .img2{
  position: absolute;
    width: 28vw;
    right: 0%;
  }
  transition: 0.7s;
}
  .off{
    position: absolute;
    opacity: 0;
    left: -100px;
  }
  .on{
    position: absolute;
    opacity: 1;
    left: 0px;
  }
`
const TextBox = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
padding-left: 10px;
padding-right: 4%;
color:#fff;
@media screen and (max-width: 741px){
  text-align: center;
}
& span{
  font-family:GmarketSansMedium;
  font-size:45px;
  font-weight: 700;
  @media screen and (max-width: 543px){
  font-size: 33px;
 }
}
& p{
  font-size: 20px;
  margin: 10px 0;
  @media screen and (max-width: 543px){
  font-size: 16px;
  }
}
& button{
  background-color: #fff;
  color: #59c8f0c5;
  font-size: 20px;
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  margin-top: 10px;
  @media screen and (max-width: 543px){
  font-size: 14px;
  }
  &:hover{
    background-color: #59c8f0c5;
    color: #fff;
    /* border:1px solid #fff; */
  }
}
& a + a{
  margin-left: 20px;
}
`