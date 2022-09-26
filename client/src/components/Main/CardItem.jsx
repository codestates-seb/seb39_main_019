import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const CardItem = ({title,guName,id,personality,size}) => {

const img = 'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG'

  return (
    <ItemContainer>
     <Link to={`/main/${id}`}>
      <ItemInner>
        <ImgBox>
          {/* <img src="https://via.placeholder.com/240x220"/> */}
          {/* <img src="https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG"/> */}
          <div style={{backgroundImage: `url(${img})`}}/>       
        </ImgBox>
        <TextBox>
          <Title>
           {title}
          </Title>
          <SubTitle>
            <div>
              {personality} {size}
            </div>
            <div>
              {guName}
            </div>
          </SubTitle>
        </TextBox>
      </ItemInner>
     </Link>
    </ItemContainer>
  )
}

export default CardItem

const ItemContainer = styled.div`
  width: calc(25% - 30px);
  border: none;
  cursor: pointer;
  color: ${(props)=>props.theme.textColor}; 
   /* background-color: ${(props)=>props.theme.HeaderColor}; 
   box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px; */
  transition: 0.3s;
  &:hover{
  transform: scale(1.07);
  }
  /*
   * 1200px
   * 720px
   * 420px
   * 380px
   */
  @media screen and (max-width:880px){
  transition: 0s !important;
  width:calc(33.333333333% - 20px);
  }
  @media screen and (max-width:750px){
  width: calc(50% - 15px);
  }
  @media screen and (max-width:463px){
  width: 100%;
  }
`
const ItemInner = styled.div`
`
const ImgBox =styled.div`
  & div{
  width: 100%;
  height: 220px;  
  border-radius: 5px; 
  background-image: url("image-url");      /* object-fit: cover; */
  background-repeat: no-repeat; // background-image가 컨테이너를 가득 채우지 못할 경우에도 반복하지 않는다.
  background-size: cover; // 사이즈가 container에 맞지 않아도 꽉 차도록 채운다. 
  background-position: center; // background-image가 컨테이너에 가운데로 오도록 한다.
 }
`
const TextBox = styled.div`
  margin-top: 10px;
  padding: 0px 5px;
`
const Title = styled.div`
  font-family: GmarketSansMedium;
  font-size: 16px;
  margin-bottom: 5px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
`
const SubTitle = styled.div`
  font-size: 11px;
  display: flex;
  justify-content: space-between;
  color: #535353;
`