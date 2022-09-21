import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <FooterContainer>
      <FooterInner>
        <div>© Copyright ⓒ 2022 Puppy Buddy</div>
        <div><a  target="_blank" href='https://github.com/codestates-seb/seb39_main_019'>깃헙 바로가기</a></div>
        <div>프론트:이선민,김영웅 백엔드:이소현,채화담</div>
      </FooterInner>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.div`
  text-align: center;
  margin-top: 100px;
  width: 100%;
  height: 120px;
  /* line-height: 110px; */
  background-color:#484f56;
  
`
const FooterInner = styled.div`
  padding-top:25px;
  & div{
    color: #aaaaaa;
  }
  & div:nth-child(2){
    margin-top: 10px;
  }
`