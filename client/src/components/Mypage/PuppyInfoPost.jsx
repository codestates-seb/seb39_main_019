import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button";
import Layout from "../Layout/Layout";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPpinfor } from "../../api/utils";

import PuppyInfoMain from "./PuppyInfoMain";

const PuppyInfoPost = () => {
  const [dogNm, setDogNm] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [sexNm, setSexNm] = useState("");

  const [allData, setAllData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    axios({
      method: "patch",
      url: `api/v1/dogs/info/1` /*"http://localhost:3001/puppyInfo"*/,
      data: {
        dogNm,
        breed,
        age,
        sexNm,
      },
    });
    setIsEdit(!isEdit);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
    setDogNm(allData.dogNm);
    setBreed(allData.breed);
    setAge(allData.age);
    setSexNm(allData.sexNm);
  };

  useEffect(() => {
    let token = sessionStorage.getItem("access_token") || "";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios({
      method: "get",
      url: "api/v1/dogs/info/1",
      // url: "http://localhost:3001/puppyInfo",
    })
      .then((res) => {
        console.log(res.data);
        setAllData(res.data);
      })
      .catch((err) => console.log(err));
  }, [isEdit]);

  return (
    <PuppyInfoPostContainer>
      <ToastContainer />
      <h1>반려견 정보 기입하기</h1>
      <PpInfoForm>
        <ul>
          <li>
            <div className='group'>
              <label htmlFor='name'>이름</label>
              {isEdit ? (
                <div>{dogNm}</div>
              ) : (
                <input
                  type='text'
                  id='name'
                  onChange={(e) => setDogNm(e.target.value)}
                  defaultValue={dogNm || allData.dogNm || ""}
                ></input>
              )}
            </div>
          </li>
          <li>
            {isEdit ? (
              <div className='group'>
                <label htmlFor='breed'>견종</label>
                <div>{breed}</div>
              </div>
            ) : (
              <div className='group'>
                <label htmlFor='breed'>견종</label>

                <input
                  type='text'
                  id='breed'
                  onChange={(e) => setBreed(e.target.value)}
                  defaultValue={breed || allData.breed || ""}
                ></input>
              </div>
            )}
          </li>
        </ul>
        <ul>
          <li>
            <div className='group'>
              <label htmlFor='age'>나이</label>
              {isEdit ? (
                <div>{age}</div>
              ) : (
                <input
                  type='text'
                  id='age'
                  onChange={(e) => setAge(e.target.value)}
                  defaultValue={age || allData.age || ""}
                ></input>
              )}
            </div>
          </li>
          <li>
            <div className='group'>
              <label htmlFor='gender'>성별</label>
              {isEdit ? (
                <div>{sexNm}</div>
              ) : (
                <select
                  name='gender'
                  onChange={(e) => setSexNm(e.target.value)}
                  defaultValue={sexNm || allData.sexNm || ""}
                >
                  <option>선택해주세요</option>
                  <option value='암컷'>암컷</option>
                  <option value='수컷'>수컷</option>
                </select>
              )}
            </div>
          </li>
        </ul>
        {isEdit ? (
          <>
            <Button text={"수정"} type={"add"} onClick={handleEdit}></Button>
          </>
        ) : (
          <ButtonContainer>
            <Button text={"등록"} type={"add"} onClick={submitHandler}></Button>
            <Button text={"취소"} type={"add"} onClick={handleEdit}></Button>
          </ButtonContainer>
        )}
      </PpInfoForm>
      {/* {Array.isArray(allData)
        ? allData.map((data) => <PuppyInfoMain data={data} key={data.id} />)
        : null} */}
    </PuppyInfoPostContainer>
  );
};

export default PuppyInfoPost;

const PuppyInfoPostContainer = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;

  /* text-align: center; */
`;
const PpInfoForm = styled.form`
  /* flex-wrap: wrap; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 32px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  width: 700px;
  margin-top: 30px;
  flex-wrap: wrap;

  ul {
    display: flex;
    grid-gap: 30px;
    flex-wrap: wrap;

    & li {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  .group {
    margin-bottom: 30px;

    #gender {
      border-bottom: 1px solid white;
      margin: 0;
    }

    div {
      width: 100%;

      display: flex;
      grid-gap: 30px;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding-bottom: 10px;

      list-style: none;
      margin: 0;
      padding: 0;
      width: 250px;
      margin-bottom: 30px;

      border-bottom: 1px solid #757575;
    }
  }
  input {
    font-size: 18px;
    padding: 10px 90px 10px 5px;
    -webkit-appearance: none;
    display: block;
    background: #fafafa;
    color: #636363;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #757575;
  }

  input:focus {
    outline: none;
  }

  select {
    font-size: 21px;
    padding: 10px 130px 10px 5px;
    -webkit-appearance: none;
    display: inline;
    background: #fafafa;
    color: #636363;
    font-weight: 100;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #757575;
    width: 100%;
  }

  select:focus {
    outline: none;
  }

  label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
  }
`;

const ButtonContainer = styled.div``;
