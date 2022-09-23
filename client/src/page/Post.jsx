 import React,{useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import styled from 'styled-components'
import ImgLode from '../components/Post/ImgLode'
import AnimalInfo from '../components/Post/AnimalInfo'
import useStore from '../store/post'
import axios from 'axios'
  
const Post = () => {
  const {location,personality,size,title,body,setTitle,setBody} = useStore()
  const titleRef = useRef()
  const bodyRef = useRef()
  const navigate = useNavigate()

  const onSubmit = () => {
  if(title.length===0){
    return titleRef.current.focus()
  }
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
          <InnerTop>
            <input ref={titleRef} onChange={(e)=>setTitle(e.target.value)} placeholder='제목을 입력해 주세요!' />
          </InnerTop>
          <InnerMid>
            <MidLeft>
              <ImgLode/>
            </MidLeft>
            <MidRight>
              <AnimalInfo/>
            </MidRight>
          </InnerMid>
          <InnerBottom>
            <input ref={bodyRef} onChange={(e)=>setBody(e.target.value)} placeholder='본문을 입력해 주세요!'></input>
          </InnerBottom>
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
  width: 800px;
  /* border: 1px solid black; */
  margin: 0 auto;
  margin-top: 80px;
  color: ${(props)=>props.theme.textColor}; 
  background-color: ${(props)=>props.theme.HeaderColor};

`
const InnerTop = styled.div`
  & input {
    width: 100%;
    padding: 15px 0;
    font-size: 20px;
    text-indent: 20px;
    border:none;
    border: 1px solid #d6d6d6;
    border-radius: 10px 10px 0 0 ;
  }

`
const InnerMid = styled.div`
display: flex;
padding: 30px;
  
`
const MidLeft = styled.div`
  flex: 1;
  margin-right: 80px;

`
const MidRight = styled.div`
  flex: 1;
  margin-left: 50px;
`
const InnerBottom = styled.div`
  & input{
    width: 100%;
    height: 100px;
    padding: 10px 0;
    resize: none;
    font-size: 20px;
    text-indent: 20px;
    border: 1px solid #d6d6d6;
    overflow-y: scroll;
  }

`