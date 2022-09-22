import React from 'react'
import styled from 'styled-components'
import useStore from '../../store/post'

const AnimalInfo = () => {

  const {setPe,setSi,setLo} = useStore()






  return (
    <AnimalContainer>
      <div>My Animal</div>
      <ul>
        <li>성격 <select  name='Pe' onChange={(e)=>setPe(e.target.value)}>
               <option>선택해주세요</option>
               <option value='# 활발함'>활발함</option>
               <option value='# 소심함'>소심함</option>
               <option value='# 겁많음'>겁많음</option>
               <option value='# 애교많음'>애교많음</option>
               </select></li>
        <li>크기 <select onChange={(e)=>setSi(e.target.value)}>
               <option>선택해주세요</option>
               <option value='# 대형견'>대형견</option>
               <option value='# 중형견'>중형견</option>
               <option value='# 소형견'>소형견</option>
               </select></li>
        <li>지역 <input onChange={(e)=>setLo(e.target.value)} placeholder='00구 로 작성해 주세요!'></input></li>
      </ul>
      <ul>
        <li>이름 <span>빵순이</span></li>
        <li>견종 <span>시고르믹스</span></li>
        <li>나이 <span>2살</span></li>
        <li>성별 <span>암컷</span></li>
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
  & span,select,input{
    margin-left: 30px;
    border-radius: 5px;
  }
  & input {
    padding: 5px 0;
    font-size: 12px;
    text-indent: 5px;
    border: 1px solid #d6d6d6;
  }
  & select{
    border: 1px solid #d6d6d6;
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