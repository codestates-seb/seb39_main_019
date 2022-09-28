 import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import styled,{css} from 'styled-components'
import { pad } from '../assets/style/Theme'
import ImgLode from '../components/Post/ImgLode'
import AnimalInfo from '../components/Post/AnimalInfo'
import useStore from '../store/post'
import axios from 'axios'
  
const Post = () => {
  const {location,personality,size,title,body,setBody,setTitle} = useStore()
  const navigate = useNavigate()
  const onSubmit = () => {
   console.log(body)
  // url:'http://43.200.20.180:8080/v1/posts',
  // url:'http://localhost:3001/content',
  return axios({
    url:'http://localhost:3001/content',
    method:'post',
    data:{
      title:title,
      personality:personality,
      guName:location,
      size:size,
      content:body,
    }
  })
  .then(()=>{
    navigate('/main')
    setBody('')
    setTitle('')
  })
  }

  return (
    <Layout child={
      <PostContainer>
        <PostInner>
          <InnerMid>
            <MidLeft>
              <ImgLode/>
            </MidLeft>
            <MidRight>
              <AnimalInfo/>
            </MidRight>
          </InnerMid>
        </PostInner>
        <button onClick={onSubmit} className='button'>등록하기</button>
        <button className='button' onClick={()=>navigate('/main')}>취소</button>
      </PostContainer>
    }/>
  )
}

export default Post

const PostContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 60px;
  text-align: center;
  .button{
    margin-top: 20px;
    margin-right: 15px;
    padding: 5px 30px;
    line-height: 30px;
    font-size: 18px;
    border: none;
    border-radius:10px;
    color: ${(props)=>props.theme.textColor}; 
    background-color: ${(props)=>props.theme.HeaderColor};
    &:hover{
      background-color: ${(props)=>props.theme.HeLogoColor};
      color: ${(props)=>props.theme.HeaderColor}
    }
}
`
const PostInner = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 80px;
  color: ${(props)=>props.theme.textColor}; 
  background-color: ${(props)=>props.theme.HeaderColor};
  @media screen and (max-width: 1200px){
    width: 100%;
  }
`

const InnerMid = styled.div`
gap: 80px;
display: flex;
padding: 30px;
justify-content: center;
align-items: center;
${pad(css`
flex-direction: column;
  `)}
`
const MidLeft = styled.div`
flex: 1;
${pad(css`
width: 100%;
  `)}
`
const MidRight = styled.div`
flex:1;
${pad(css`
  width: 100%;
  margin-top: -35px;
    `)}
`