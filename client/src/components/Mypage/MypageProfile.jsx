import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "../Button";
import ProfileEdit from "./ProfileEdit";
import { ReactComponent as ProfileSmile } from "../../assets/imgs/ProfileSmile.svg";
import { ReactComponent as ProfileSun } from "../../assets/imgs/ProfileSun.svg";
import { ReactComponent as Profile } from "../../assets/imgs/Profile.svg";

const MypageProfile = () => {
  const [headerData, setHeaderData] = useState("");
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/signup")
      .then((response) => response.data)
      .then((data) => setHeaderData(data));
  }, [headerData]);

  return (
    <MypageProfileContainer>
      <ProfileImg>
        <PIMG>
          {/* <ProfileSmile /> */}
          {/* <ProfileSun /> */}
          <Profile />
        </PIMG>
      </ProfileImg>
      <ProfileInfo>
        <div>{headerData.nickname}</div>
        <div>{headerData.email}</div>
        <BtnContainer>
          <Button text={"반려견 정보 등록하기"} type={"mypage"}></Button>
          <Button
            text={"내 정보 수정하기"}
            type={"mypage"}
            onClick={() => setIsShow((s) => !s)}
          ></Button>
          <ProfileEdit
            isShow={isShow}
            closeModal={() => setIsShow(false)}
            headerData={headerData}
            setHeaderData={setHeaderData}
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
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

const BtnContainer = styled.div`
  display: flex;
`;
