import React, { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Toggle } from "./Toggle";
import { ReactComponent as BlackSerch } from "../assets/imgs/BlackSerch.svg";
import { ReactComponent as WhiteSerch } from "../assets/imgs/WhiteSerch.svg";
import { ReactComponent as Menubar } from "../assets/imgs/menubar.svg";
import useStore from "../store/globalStore";
import useAuthStore from "../store/authStore";

const Header = () => {
  const {isLight} = useStore()
  const {isLogin} = useAuthStore()
  // const {userInfro} = useUserInfe()
  const dropDownRef = useRef(null)
  const [isOpen,setIsOpen] = React.useState(false)

  return (
    <HeaderCotainer>
      <HeaderWrap>
        <HeaderLogo>
          <Link to={"/main"}>
            <span>Puppy Buddy</span>
          </Link>
        </HeaderLogo>
        <HeaderSerch>
          <input placeholder='검색어를 입력해 주세요!' />
          {isLight ? <BlackSerch /> : <WhiteSerch />}
        </HeaderSerch>
        <HeaderButton>
          <Toggle/>
          <Menubar onClick={()=>setIsOpen(!isOpen)}/>
          <ul ref={dropDownRef} className={isOpen? 'active':'menu'}>
            {isLogin?<>
            <li><Link to="/post">글작성하기</Link></li>
            <li><Link to="/mypage">마이페이지</Link></li>
            <li>로그아웃</li>
            </>:<>
            <li><Link to="/login">로그인</Link></li>
            <li><Link to="/signup">회원가입</Link></li> 
            <li><Link to="/post">글작성하기</Link></li></>}
          </ul>
        </HeaderButton>
      </HeaderWrap>
    </HeaderCotainer>
  );
};

export default Header;

const HeaderCotainer = styled.div`
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 60px;
  background-color: ${(props) => props.theme.HeaderColor};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const HeaderWrap = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLogo = styled.div`
  padding-left: 20px;
  flex: 2;
  margin-right: 20px;
  & span {
    font-family: KOTRAHOPE;
    font-weight: bold;
    font-size: 35px;
    color: ${(props) => props.theme.HeLogoColor};
    cursor: pointer;
    white-space: nowrap;
  }
  @media screen and (max-width: 610px) {
    flex: 5;
  }
`;

const HeaderSerch = styled.div`
  position: relative;
  flex: 6;
  & input {
    width: 90%;
    padding: 10px;
    text-indent: 30px;
    background-color: ${(props) => props.theme.HeaderColor};
    border: 1px solid #e0e0e0;
    border-radius: 30px;
    font-size: 18px;
    color: ${(props) => props.theme.textColor};
    &::placeholder {
      color: rgba(155, 162, 168, 0.55);
    }
    &:focus {
      outline: none;
    }
  }
  & svg {
    position: absolute;
    left: 10px;
    top: 12px;
  }
  @media screen and (max-width: 610px) {
    display: none;
  }
`;
const HeaderButton = styled.div`
  position: relative;
  flex: 1.5;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-right: 5px;
  cursor: pointer;
  & svg {
    margin-right: 10px;
  }

  @media screen and (max-width: 610px) {
    padding-right: 10px;
  }
  & ul {
    & li {
      margin-top: 10px;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
  .menu {
    background: #fff;
    border-radius: 8px;
    position: absolute;
    top: 100%;
    right: -1%;
    width: 120px;
    text-align: center;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: 0.3s;
    padding: 10px;
    color: ${(props) => props.theme.textColor};
  }

  .active {
    transition: 0.3s;
    position: absolute;
    top: 160%;
    right: -1%;
    width: 120px;
    text-align: center;
    border-radius: 8px;
    background-color: ${(props) => props.theme.HeaderColor};
    color: ${(props) => props.theme.textColor};
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    padding: 20px;
    font-size: 15px;
    opacity: 1;
    visibility: visible;
  }
`;
