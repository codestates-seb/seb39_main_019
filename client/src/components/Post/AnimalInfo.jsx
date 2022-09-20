import React from 'react'
import styled from 'styled-components'

const AnimalInfo = () => {
  return (
    <AnimalContainer>
      <div>My Animal</div>
      <ul>
        <li>성별 <button># 암컷</button></li>
        <li>견종 <span>시고르믹스</span></li>
        <li>지역 <span>강남구</span></li>
      </ul>
      <ul>
        <li>이름 <span>빵순이</span></li>
        <li>나이 <span>2살</span></li>
        <li>크기 <button># 암컷</button></li>
      </ul>
    </AnimalContainer>
  )
}

export default AnimalInfo

const AnimalContainer = styled.div`

  margin-top: 30px;
  & div{
    padding-right: 100px;
    font-size: 20px;
    font-weight: 700;
  }
  & span,button{
    margin-left: 30px;
  }

  & li{
    margin: 15px 0;
  }
  & ul{
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`