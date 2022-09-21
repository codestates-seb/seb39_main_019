import { faRuler } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import React from 'react'
import styled from 'styled-components'

const CardItem = ({title,location,id,personality,size}) => {

const img = 'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG'

  return (
    <ItemContainer>
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
              {location}
            </div>
          </SubTitle>
        </TextBox>
      </ItemInner>
    </ItemContainer>
  )
}

export default CardItem

const ItemContainer = styled.div`
  width: 280px;
  height: 330px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: ${(props)=>props.theme.textColor}; 
  background-color: ${(props)=>props.theme.HeaderColor};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: 0.3s;
  &:hover{
      transform: scale(1.07);
    }
`
const ItemInner = styled.div`
  padding: 20px;

`
const ImgBox =styled.div`
  & div{
    width: 240px;
    height: 220px;
    /* object-fit: cover; */
    border-radius: 5px; 
    /* width: 100%;
    height: 28vh; */
     background-image: url("image-url");
    background-repeat: no-repeat; // background-image가 컨테이너를 가득 채우지 못할 경우에도 반복하지 않는다.
    background-size: cover; // 사이즈가 container에 맞지 않아도 꽉 차도록 채운다. 
    background-position: center; // background-image가 컨테이너에 가운데로 오도록 한다.  
  }
`
const TextBox = styled.div`
  margin-top: 10px;

`
const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
`
const SubTitle = styled.div`
  font-size: 13px;
  font-family: Pretendard_Regular;
  display: flex;
  justify-content: space-between;
  color: #9f9f9f;
`