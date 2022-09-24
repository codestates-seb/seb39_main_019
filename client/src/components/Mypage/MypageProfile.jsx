import React, { useState, useEffect } from "react";
import styled from "styled-components";
import profileImg from "../../assets/imgs/unknownProfile.png";
import axios from "axios";

const MypageProfile = () => {
  const [headerData, setHeaderData] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/signup")
      .then((response) => response.data)
      .then((data) => setHeaderData(data));
  }, []);

  return (
    <MypageProfileContainer>
      <ProfileImg>
        <PIMG
          // src={process.env.PUBLIC_URL + "/img/stackUserIcon.png"}
          src={
            // headerData.profileImg
            //   ? headerData.profileImg
            //   : process.env.PUBLIC_URL + "/img/stackUserIcon.png"

            profileImg
          }
          alt='user icon'
        ></PIMG>
      </ProfileImg>
      <ProfileInfo>
        <div>{headerData.nickname}</div>
        <div>{headerData.email}</div>
        <BtnContainer>
          <button>반려견 정보 등록하기</button>
          <button>내 정보 수정하기</button>
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
  border: 1px solid black;
`;

const PIMG = styled.img`
  width: 100px;
  height: 100px;
  margin: 20px;
`;
const ProfileInfo = styled.div`
  width: 100%;
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

const BtnContainer = styled.div``;
