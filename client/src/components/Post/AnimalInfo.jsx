import React from 'react'
import styled from 'styled-components'
import useStore from '../../store/post'

const AnimalInfo = () => {

  const {setPe,setSi,setLo,setBody,setTitle} = useStore()


  return (
    <AnimalContainer>
        <div>제목<input onChange={(e)=>setTitle(e.target.value)}></input></div>
        <div>성격<select  name='Pe' onChange={(e)=>setPe(e.target.value)}>
               <option>선택해주세요</option>
               <option value='ACTIVE'>활발함</option>
               <option value='TIMID'>소심함</option>
               <option value='SHY'>겁많음</option>
               <option value='CUTE'>애교많음</option>
               </select></div>
        <div>크기<select onChange={(e)=>setSi(e.target.value)}>
               <option>선택해주세요</option>
               <option value='LARGE'>대형견</option>
               <option value='MIDDLE'>중형견</option>
               <option value='SMALL'>소형견</option>
               </select></div>
        <div>지역<input onChange={(e)=>setLo(e.target.value)} placeholder='00구 로 작성해 주세요!'></input></div>
        <div style={{"alignItems": "flex-start"}}>소개<textarea onChange={(e)=>setBody(e.target.value)}></textarea></div>
    </AnimalContainer>
  )
}

export default AnimalInfo

const AnimalContainer = styled.div`
height: 100%;
   & div{
     display: flex;
     align-items: center;
     margin-bottom: 30px;
     white-space: nowrap;
     & input{
      width: calc(89% - 15px);
      height: 30px;
      margin: 0px;
      border: none;
      border-bottom: 1px solid #ddd;
      border-radius: 5px;
      text-indent: 5px;
      &:focus {outline: none;}
     }
     & select{
      width: calc(89% - 15px);
      height: 30px;
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 5px;
     }
     & textarea{
      width: calc(89% - 15px);
      height: 150px;
      border: 1px solid #ddd;
      resize: none;
      padding: 5px;
      border-radius: 5px;
      &:focus {outline: none;}
     }
     & input,select,textarea{
    margin-left: 15px;
    background-color: ${(props)=>props.theme.bgInput};
   }
   }


`