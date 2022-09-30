import React from "react";
import Header from "../components/Header";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { REST_API_KEY, REDIRECT_URI, PUPPY_API_KEY } from "../secretData";
import styled from "styled-components";
import Signup from "./Signup";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import Button from "../components/Button";
import PpAuthDoneMdl from "../components/Modal/PpAuthDoneMdl";
import PpAuthFailMdl from "../components/Modal/PpAuthFailMdl";
import useAuthStore from "../store/authStore";
import Swal from "sweetalert2";
// import { postPpAuth } from "../api/utils";

const PuppyAuthentication = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [api, setApi] = useState("");
  const [ppOwner, setPpOwner] = useState("");
  const [regiNumber, setRegiNumber] = useState("");
  const ppOwnerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split("=")[1];
  const { setIsPpAuth } = useAuthStore();

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  // const getKakaoToken = () => {
  //   fetch(`https://kauth.kakao.com/oauth/token`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data) {
  //         sessionStorage.setItem("token", data.access_token);
  //         localStorage.setItem("token", data.refresh_token);
  //       } else {
  //         navigate("/");
  //       }
  //     });
  // };

  // //1 토큰 보내기
  const getKakaoToken = () => {
    axios({
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: `https://kauth.kakao.com/oauth/token`,
      data: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    }).then((response) => {
      console.log("kakaotoken:", response);
      if (response.data) {
        sessionStorage.setItem("token", response.data.access_token);
        localStorage.setItem("token", response.data.refresh_token);
        const kakaoAccessToken = response.data.access_token;
        const kakaoRefreshToken = response.data.refresh_token;
      } else {
        navigate("/");
      }
    });
  };

  // const postKakaoToken = () => {
  //   axios({
  //     method: "post",
  //     url: `백엔드 엔드포인트추가`,
  //     data: kakaoAccessToken, kakaoRefreshToken,
  //   });
  // };

  //2 토큰보내기
  const getKakaoToken2 = () => {
    axios({
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: `https://kauth.kakao.com/oauth/token`,
      data: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    }).then((response) => {
      console.log(response);
      if (response.data) {
        const kakaoAccessToken = response.data.access_token;
        const kakaoRefreshToken = response.data.refresh_token;

        axios.post("백엔드 엔드포인트", {
          kakaoAccessToken,
          kakaoRefreshToken,
        });
      } else {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    if (!location.search) return;
    getKakaoToken();
    // postKakaoToken();
  }, []);

  const apiBtnHandler = (e) => {
    e.preventDefault();

    let token = sessionStorage.getItem("access_token") || "";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .post("api/v1/dogs/validation", {
        owner_nm: ppOwner,
        dog_reg_no: regiNumber,
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: "반려견 정보를 입력해주세요",
          width: "300px",
          height: "250px",
        });
        navigate("/mypage");
        setIsPpAuth();
        console.log(response);
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          text: "이미 인증된 등록번호이거나 유효하지 않은 등록번호입니다.",
          width: "300px",
          height: "250px",
        });
      });
  };

  return (
    <div>
      <Header />
      <SocialModalContainer>
        <HeaderLogo>
          <Link to={"/"}>
            <span>Puppy Buddy</span>
          </Link>
        </HeaderLogo>
        <InformMsg>
          입력하신 동물 등록 번호는 해당 번호의 중복 가입을 방지하기 위한
          용도로만 사용되며 회원 탈퇴 시 파기됩니다.
        </InformMsg>
        <InputForm>
          <h1>견주 인증</h1>
          <form /*</InputForm>*/ onSubmit={apiBtnHandler}>
            <div className='group'>
              <label htmlFor='ppOwner'>소유자</label>
              <input
                type='text'
                id='ppOwner'
                onChange={(e) => setPpOwner(e.target.value)}
                required
                // value={ppOwner}
                ref={ppOwnerRef}
              ></input>
            </div>
            <div className='group'>
              <label htmlFor='regiNumber'>등록번호</label>
              <input
                type='text'
                id='regiNumber'
                onChange={(e) => setRegiNumber(e.target.value)}
                required
                value={regiNumber}
              ></input>
            </div>
            <Button text={"인증하기"} type={"auth"}></Button>
          </form>
        </InputForm>
      </SocialModalContainer>
    </div>
  );
};

export default PuppyAuthentication;

const SocialModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  /* form {
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
    } */
  /* } */
`;

const HeaderLogo = styled.div`
  /* padding-left: 20px; */
  margin-bottom: 20px;
  & span {
    font-family: KOTRAHOPE;
    font-weight: bold;
    font-size: 35px;
    color: ${(props) => props.theme.HeLogoColor};
    cursor: pointer;
    white-space: nowrap;
  }
`;

const InformMsg = styled.div`
  margin-bottom: 40px;
`;

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 380px;
  padding: 48px 32px 32px 32px;
  background-color: ${(props) => props.theme.HeaderColor};

  box-shadow: rgba(0, 0, 0, 0.14902) 0px 1px 1px 0px,
    rgba(0, 0, 0, 0.09804) 0px 1px 2px 0px;

  h1 {
    margin-bottom: 50px;
  }
  .group {
    margin-bottom: 30px;
  }
  input {
    font-size: 18px;
    padding: 10px 90px 10px 5px;
    -webkit-appearance: none;
    display: block;
    background-color: transparent;
    color: ${(props) => props.theme.textColor};
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #757575;
  }

  input:focus {
    outline: none;
  }

  label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
  }
`;
