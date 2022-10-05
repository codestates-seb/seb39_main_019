import React from 'react'
import styled,{css} from 'styled-components'
import useScroll from '../../hooks/useScroll'
import { middle ,phone } from '../../assets/style/Theme'
import randing from '../../assets/imgs/randing.png' 

const Section2 = () => {

  const {scrollY} = useScroll()
  return (
    <TwoContainer>
      <TwoInner>
       <div className={scrollY>200?'on':'off'}>
          <span>퍼피 버디만 하면</span><br/>
          <span>강아지 친구가 만들어지는</span>
          <p className='fristP'>원하는 동네에서 원하는 강아지 친구랑</p>
          <p>태그 기능을 통해 간편하게 찾아보고 산책하기 !</p>
       </div>
       <ImgBox className={scrollY>600?'on':'off'}>
        <img src={randing}/>
       </ImgBox>      
      </TwoInner>
    </TwoContainer>
  )
}

export default Section2

const TwoContainer = styled.div`
width: 100%;
  background-color: #fff;
  height: 900px;
  text-align: center;
  padding-top: 100px;
  ${phone(css`
    height: 500px;
    `)}
`
const TwoInner = styled.div`
width: 100%;
height: 100%;
position: relative;
display: flex;
flex-direction: column;
justify-content: space-around;
  ${phone(css`
      margin-top: 25px;
  `)}
  & div{
    width: 100%;
    ${middle(css`
      padding:0 5%;
      .fristP{
      margin-top: 10px;
      }
    `)}
  & span{
         font-family: sans-serif;
         background: linear-gradient(to right, #00bbffc5, #5ccbf3c5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
         font-style: normal;
         font-size: 60px;
         font-weight: bold;
         ${middle(css`
          font-size: 50px;
          `)}
    }
    & p{
    font-size: 20px;
    margin-top: 3px;
    color: #757575;
    ${middle(css`
    font-size: 17px;
    `)}
  }
  transition: 0.8s;
}
  .off{
    position: absolute;
    opacity: 0;
    top: 50px;
    left: 50%;
    transform: translate(-50%);

  }
  .on{
    position: absolute;
    top: 0px;
    opacity: 1;
    left: 50%;
    transform: translate(-50%);
  }
`
const ImgBox = styled.div`
  margin-top: 250px;
  & img{
    max-width: 800px;
    width: 80%;
    ${middle(css`
    width: 100%;
    `)}
    ${phone(css`
    display: none;
    `)}
  }

`