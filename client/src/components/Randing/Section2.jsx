import React from 'react'
import styled from 'styled-components'
import useScroll from '../../hooks/useScroll'

const Section2 = () => {

  const {scrollY} = useScroll()


  return (
    <TwoContainer>
      <TwoInner>
       <div className={scrollY>300?'on':'off'}>
          <span>퍼피 버디만 하면</span><br/>
          <span>강아지 친구가 만들어지는</span>
          <p>원하는 동네에서 원하는 강아지 친구랑</p>
          <p>태그 기능을 통해 간편하게 찾아보고 산책하기 !</p>
       </div>
      </TwoInner>
    </TwoContainer>
  )
}

export default Section2

const TwoContainer = styled.div`
  background-color: #fff;
  height: 900px;
  text-align: center;
  padding-top: 100px;
`
const TwoInner = styled.div`
position: relative;
  & div{

  & span{
         font-family: sans-serif;
         background: linear-gradient(to right, #00bbffc5, #5ccbf3c5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
         font-style: normal;
         font-size: 60px;
         font-weight: bold;
    }
    & p{
    font-size: 20px;
    margin-top: 3px;
    color: #757575;
  }
  transition: 0.8s;
}
  .off{
    position: absolute;
    opacity: 0;
    top: 50px;
    left: 30%;

  }
  .on{
    position: absolute;
    top: 0px;
    opacity: 1;
    left: 30%;
  }
`