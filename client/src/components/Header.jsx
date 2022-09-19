import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { Toggle } from './Toggle'
import {ReactComponent as BlackSerch} from '../assets/imgs/BlackSerch.svg'
import {ReactComponent as WhiteSerch} from '../assets/imgs/WhiteSerch.svg'
import useStore from '../store/globalStore'


const Header = () => {
const {isDark} = useStore()

  return (
    <HeaderCotainer>
      <HeaderWrap>
        <HeaderLogo>
         <Link to={'/'}><span>Puppy Buddy</span></Link> 
        </HeaderLogo>
        <HeaderSerch>
          <input/>
          {isDark?<WhiteSerch/>:<BlackSerch/>}
        </HeaderSerch>
        <HeaderButton>
          <Link to={'/login'}><button>로그인</button></Link>
          <Toggle/>
        </HeaderButton>
      </HeaderWrap>
    </HeaderCotainer>
  )
}

export default Header

const HeaderCotainer = styled.div`
height: 85px;
background-color: ${(props)=>props.theme.HeaderColor};
box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`

const HeaderWrap = styled.div`
max-width: 1280px;
margin: 0 auto;
height: 100%;
display: flex;
justify-content: space-between;
align-items: center;
`

const HeaderLogo = styled.div`
padding-left: 20px;
flex: 1;
  & span{
    font-family: yg_jalnan;
    font-weight: 700;
    font-size: 24px;
    color: ${(props)=>props.theme.HeLogoColor};
    cursor: pointer;
  }
`

const HeaderSerch = styled.div`
  position: relative;
  flex: 5;
  & input{
    width: 70%;
    padding: 5px;
    text-indent: 15px;
    background-color: ${(props)=>props.theme.HeaderColor};
    border: none;
    border-bottom: 1px solid ${(props)=>props.theme.textColor};
  }
  & svg{
    position: absolute;
    left: 0;
    top: 3px;
  }

`
const HeaderButton = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  & button{
    padding: 5px 10px;
    color: ${(props)=>props.theme.textColor};
    background-color: ${(props)=>props.theme.HeaderColor};
    margin-right: 20px;
    line-height: 30px;
    font-size: 18px;
    border: none;
    border-radius:30px;
    &:hover{
      background-color: ${(props)=>props.theme.HeLogoColor};
      color: ${(props)=>props.theme.HeaderColor}
    }
  }

`