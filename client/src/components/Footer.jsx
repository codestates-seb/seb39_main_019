import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <FooterContainer>
      <FooterInner>
        <div>© Copyright ⓒ 2022 Puppy Buddy</div>
        <div>프론트:이선민,김영웅 백엔드:이소현,채화담</div>
        <p><a  target="_blank" href='https://github.com/codestates-seb/seb39_main_019'>깃헙 바로가기</a></p>
      </FooterInner>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.div`
  border-top:1px solid ${(propt)=>propt.theme.Boder};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  width: 100%;
  height: 200px;
  background-color: ${(props) => props.theme.Footerbg};
`
const FooterInner = styled.div`
  & div{
    color: #aaaaaa;
  }
  & div:nth-child(2){
    margin-top: 10px;
    margin-bottom: 5px;
  }
  & p{
    width: 107px;
    margin-top: 10px;
    color: ${(props) => props.theme.textColor};
    border-radius: 30px;
  }
`