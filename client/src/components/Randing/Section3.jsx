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
        <span>간편한 등록으로 안전하게 </span>
        <span> 신속하게</span>
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

`
const ImgBox = styled.div`
width: 100%;
height: 100%;
position: relative;

& div{
  width: 100%;
  height: 100%;
  display: flex;
justify-content: center;
align-items: center;
  .img1{
    position: absolute;
    width: 30vw;
    right: 38%;
  }
  .img2{
    position: absolute;
    width: 30vw;
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
color:#fff;
& span{
  font-family:GmarketSansMedium;
  font-size:50px;
  font-weight: 700;
}
& p{
  font-size: 1.30vw;
  margin: 10px 0;
}
& button{
  background-color: #fff;
  color: #59c8f0c5;
  font-size: 20px;
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  margin-top: 10px;
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