import axios from 'axios'
import React from 'react'
import styled from 'styled-components'

const CardItem = ({title,location,id}) => {

 const [name,setName] = React.useState([])

 
 React.useEffect(()=>{
   axios.get(`http://localhost:3001/user/${id}`)
   .then((data)=>setName(data.data))
 },[])


  return (
    <ItemContainer>
      <ItemInner>
        <ImgBox>
          <img src="https://via.placeholder.com/240x220"/>
        </ImgBox>
        <TextBox>
          <Title>
           {title}
          </Title>
          <SubTitle>
            <div>
              {name.name}
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
  transition: 0.3s;
  &:hover{
      transform: scale(1.07);
    }
`
const ItemInner = styled.div`
  padding: 20px;

`
const ImgBox =styled.div`
  & img{
    border-radius: 5px;
  }
`
const TextBox = styled.div`
  margin-top: 10px;

`
const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  overflow: hidden;
`
const SubTitle = styled.div`
  font-size: 13px;
  font-family: Pretendard_Regular;
  display: flex;
  justify-content: space-between;
`