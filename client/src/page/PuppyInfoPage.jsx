import React from "react";
import styled from "styled-components";
import Button from "../components/Button";

const PuppyInfoPage = () => {
  return (
    <PuppyInfoPageContainer>
      <h1>반려견 정보 기입하기</h1>
      <PpInfoForm>
        <ul>
          <li>
            <div className='group'>
              <label htmlFor='name'>이름</label>
              <input type='text' id='name'></input>
            </div>
          </li>
          <li>
            <div className='group'>
              <label htmlFor='breed'>견종</label>
              <input type='text' id='breed'></input>
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <div className='group'>
              <label htmlFor='age'>나이</label>
              <input type='text' id='age'></input>
            </div>
          </li>
          <li>
            {" "}
            <div className='group'>
              <label htmlFor='gender'>성별</label>
              {/* <input type='text' id='gender'></input> */}
              <select name='gender'>
                <option>선택해주세요</option>
                <option value='female'>여자</option>
                <option value='male'>남자</option>
              </select>
            </div>
          </li>
        </ul>

        <Button text={"등록/수정하기"} type={"mypageBtn"}></Button>
      </PpInfoForm>
    </PuppyInfoPageContainer>
  );
};

export default PuppyInfoPage;

const PuppyInfoPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 60px;
  /* text-align: center; */
`;
const PpInfoForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 32px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  width: 500px;
  margin-top: 30px;

  ul {
    display: flex;
    grid-gap: 30px;

    li {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  .group {
    margin-bottom: 30px;
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
    padding: 10px 90px 10px 5px;
    -webkit-appearance: none;
    display: block;
    background: #fafafa;
    color: #636363;
    font-weight: 100;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #757575;

    & select:focus {
      outline: none;
    }
  }

  label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
  }
`;
