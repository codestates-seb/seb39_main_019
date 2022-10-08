import React from 'react'
import styled,{css} from 'styled-components'
import {middle} from '../../assets/style/Theme'
import dogImg from '../../assets/imgs/Secdog1.png' 
import { Link } from 'react-router-dom'


const Section1 = () => {



  return (
    <ContainerOne>
      <OneInner className='on'>
        <div>동네 주민과 강아지 산책까지</div>
        <div>모두 퍼피 버디로</div>
        <p>요즘 같이 좋은 날 강아지 친구 만들기 퍼피퍼피 해보세요!</p>
        <Link to={'/main'}><button>Puppy Buddy 둘러보기</button></Link>
      </OneInner>
      <img src={dogImg}/>
    </ContainerOne>
  )
}

export default Section1

const ContainerOne = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  background-color: #59c8f0c5;
  font-family: sans-serif;
  padding: 100px 0;
  display: flex;
  transition: 0.4s;

  & img{
    position: absolute;
    max-width: 950px;
    width: 60vw;
    bottom: 0;
    right: 0;
    ${middle(css`
     width: 0;
   `)}
  }
  .on{
    position: absolute;
    animation: slide 1.3s ease-out;
    left: 8%;
    ${middle(css`
     left: 4%;
     padding-right: 2%;
   `)}
  }
  @keyframes slide {
    from{
        left:-500px;
        opacity: 0;
    }
    to{
        left: 8%;
        opacity: 1;
    }
    
}
`
const OneInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  color: #fff;
  margin-top: 80px;
  & div{
    width: 100%;
    font-size: 50px;
    font-weight: bold;
    ${middle(css`
     font-size:45px;
   `)}
    /* white-space:nowrap; */
  }
  & p{
    margin-top: 30px;
    font-size: 22px;
    font-weight: 400;
    ${middle(css`
     font-size:20px;
   `)}
  }
  & button{
    margin-top: 40px;
    border: 1px solid white;
    background-color: #fff;
    color: #59c8f0c5;
    font-size: 20px;
    padding: 10px 30px;
    border-radius: 30px;
    transition: 0.3s;
    &:hover{
      background-color:#59c8f0c5;
      color:#fff
    }
    ${middle(css`
     width: 98%;
   `)}
  }
`