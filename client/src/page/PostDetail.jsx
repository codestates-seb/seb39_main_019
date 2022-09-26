import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import styled from 'styled-components'
import axios from 'axios'


const PostDetail = () => {

 const {id} = useParams()
 const [data,setData] = React.useState([])
 
 useEffect(() => {
   axios({
     method:'get',
     url:`http://localhost:3001/content/${id}`
   }).then((data)=>{
     setData(data.data)
    })
  },[])
  const {title,personality,guName,size,content} = data

  return (
    <Layout child ={
      <DetailContainer>
       <InnerContainer>
         <InnerDetail>
          <DetailTop>
            <h1>{title}</h1>
            <div>
              <span>빵댕이팡팡</span>
              <div>
              <img src='#'/>
              <span>관심있어요</span>
              </div>
            </div>
          </DetailTop>
          <DetailMid>
            <div>
              <img src='#'></img>
              <div>
                <div>이름<span>빵순이</span></div>
                <div>나이<span>2 살</span></div>
                <div>성별<span>암컷</span></div>
                <div>견종<span>시고르자브종</span></div>
                <div>크기<span>{size}</span></div>
                <div>성격<span>{personality}</span></div>
                <div>지역<span>{guName}</span></div>
              </div>
            </div>
          </DetailMid>
          <DetailBottom>
            <div>{content}</div>
          </DetailBottom>
         </InnerDetail>
       </InnerContainer>
      </DetailContainer>
    }/>
  )
}

export default PostDetail

const DetailContainer = styled.div`
  padding-top: 60px;
  height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
`
const InnerContainer = styled.div`
  width: 60%;
  margin: 0 auto;
`

const InnerDetail = styled.div`
  width: 100%;
  margin-top: 100px;
`
const DetailTop = styled.div`
  & >div{
    margin-top: 5px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    & div{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`
const DetailMid = styled.div`
width: 100%;
margin-top: 20px;
padding: 10px;
  & > div{
     display: flex;
     align-items: center;
     white-space: nowrap;
    & img{
      width: 100%;
      height: 400px;
      border: 1px solid #eee;
    }
    & div{
      width: 90%;
      margin:30px 0;
      font-size: 17px;
      padding-left: 50px;
      font-family: GmarketSansMedium;
      
      & span{
        display: inline-block;
        font-size: 16px;
        margin-left: 15px;
        color: #6b6b6b;
        font-family: S_CoreDream_3Light;
      }
    }
  }
  
  `
const DetailBottom = styled.div`
  
` ;