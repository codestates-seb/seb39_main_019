import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { Toggle } from './Toggle'
import {ReactComponent as BlackSerch} from '../assets/imgs/BlackSerch.svg'
import {ReactComponent as WhiteSerch} from '../assets/imgs/WhiteSerch.svg'
import useStore from '../store/globalStore'


const Header = () => {
const {isLight} = useStore()

  return (
    <HeaderCotainer>
      <HeaderWrap>
        <HeaderLogo>
         <Link to={'/main'}><span>Puppy Buddy</span></Link> 
        </HeaderLogo>
        <HeaderSerch>
          <input placeholder='검색어를 입력해 주세요!'/>
          {isLight?<BlackSerch/>:<WhiteSerch/>}
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
position: fixed;
z-index: 100;
width: 100%;
height: 60px;
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
flex: 2;
  & span{
    /* font-family: yg_jalnan; */
    font-weight: 700;
    font-size: 24px;
    color: ${(props)=>props.theme.HeLogoColor};
    cursor: pointer;
  }
`

const HeaderSerch = styled.div`
  position: relative;
  flex: 6;
  & input{
    width: 90%;
    padding: 10px;
    text-indent: 30px;
    background-color: ${(props) => props.theme.bgColor};
    border: none;
    border-radius: 10px;
    font-size: 18px;
    color: ${(props) => props.theme.textColor};
    &::placeholder{
      color:rgba(155,162,168,0.55);
    }
    &:focus {outline: none;}
  }
  & svg{
    position: absolute;
    left: 10px;
    top: 12px;
  }

`
const HeaderButton = styled.div`
  flex: 2;
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
    white-space:nowrap;
    &:hover{
      background-color: ${(props)=>props.theme.HeLogoColor};
      color: ${(props)=>props.theme.HeaderColor}
    }
  }

`