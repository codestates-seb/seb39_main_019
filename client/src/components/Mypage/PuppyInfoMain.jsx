import React from "react";
import styled from "styled-components";
import Button from "../Button";

const PuppyInfoMain = ({ data }) => {
  return (
    <PuppyInfoMaiContainer>
      <MainDataForm>
        <ul>
          <li>
            <label htmlFor='name'>이름:</label>
            {data.dogNm}
          </li>
          <li>
            <label htmlFor='breed'>견종:</label>
            {data.breed}
          </li>
        </ul>
        <ul>
          <li>
            <label htmlFor='age'>나이:</label>
            {data.age}
          </li>
          <li>
            <label htmlFor='gender'>성별:</label>
            {data.sexNm}
          </li>
        </ul>
        <Button text={"삭제하기"} type={"delete"}></Button>
      </MainDataForm>
    </PuppyInfoMaiContainer>
  );
};

export default PuppyInfoMain;

const PuppyInfoMaiContainer = styled.div``;
const MainDataForm = styled.form`
  /* border: 1px solid black; */
  font-size: larger;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 700px;
  margin-top: 30px;
  padding: 30px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  flex-wrap: wrap;

  ul {
    display: flex;
    grid-gap: 30px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;

    & li {
      list-style: none;
      margin: 0;
      padding: 0;
      width: 250px;
      margin-bottom: 30px;

      border-bottom: 1px solid #757575;
    }
  }

  label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    padding-right: 20px;
  }
`;
