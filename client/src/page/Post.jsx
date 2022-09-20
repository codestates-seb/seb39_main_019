import React from 'react'
import Layout from '../components/Layout/Layout'
import styled from 'styled-components'
import ImgLode from '../components/Post/ImgLode'
import AnimalInfo from '../components/Post/AnimalInfo'

const Post = () => {
  return (
    <Layout child={
      <PostContainer>
        <PostInner>
          <InnerTop>
            <input placeholder='제목을 입력해 주세요!' />
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
            <input placeholder='본문을 입력해 주세요!'></input>
          </InnerBottom>
        </PostInner>
        <button className='button'>등록하기</button>
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
    padding: 10px 0;
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