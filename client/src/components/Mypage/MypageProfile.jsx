import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import Button from "../Button";
import ProfileEdit from "./ProfileEdit";
import PuppyInfoEdit from "./PuppyInfoEdit";
import { ReactComponent as Profile } from "../../assets/imgs/Profile.svg";
import { Link } from "react-router-dom";
import { phone } from "../../assets/style/Theme";
import instance from "../../api/core/default";
import useUserInfo from "../../store/userinfo";

const MypageProfile = () => {
  const [headerData, setHeaderData] = useState("");
  const [isProfileShow, setIsProfileShow] = useState(false);
  const [isPuppyShow, setIsPuppyShow] = useState(false);
  const { userInfo, setUserInfo, userNickName, userEmail, setUserNickName } =
    useUserInfo();

  useEffect(() => {
    instance({
      method: "get",
      url: "/api/me",
    })
      .then((response) => {
        console.log(response);
        setUserNickName(response.nickname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <MypageProfileContainer>
      <ProfileImg>
        <PIMG>
          <Profile />
        </PIMG>
      </ProfileImg>
      <ProfileInfo>
        <div>{userNickName}</div>
        <div>{userEmail}</div>
        <BtnContainer>
          <Link to='/PuppyInfoPage'>
            <Button
              text={"반려견 정보 등록하기"}
              type={"mypage"}
              // onClick={() => setIsPuppyShow((s) => !s)}
            ></Button>
          </Link>
          <PuppyInfoEdit
            isPuppyShow={isPuppyShow}
            closeModal={() => setIsPuppyShow(false)}
          />
          <Button
            text={"내 정보 수정하기"}
            type={"mypage"}
            onClick={() => setIsProfileShow((s) => !s)}
          ></Button>
          <ProfileEdit
            isProfileShow={isProfileShow}
            closeModal={() => setIsProfileShow(false)}
            // headerData={headerData}
            // setHeaderData={setHeaderData}
          />
        </BtnContainer>
      </ProfileInfo>
    </MypageProfileContainer>
  );
};

export default MypageProfile;

const MypageProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 60px;
`;
const ProfileImg = styled.div`
  /* border: 1px solid black; */
`;

const PIMG = styled.div`
  margin: 20px 15px 20px 30px;
`;

const ProfileInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px
  display: flex;

  ${phone(css`
    font-size: 14px;
  `)}
`;

const BtnContainer = styled.div`
  display: flex;
  ${phone(css`
    width: 220px;
    padding: 0 0;
    font-size: 14px;
  `)}
`;
