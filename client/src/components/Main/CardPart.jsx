import React from 'react'
import styled from 'styled-components'
import CardItem from './CardItem'
import axios from 'axios'



const CardPart = () => {

  const [data,setData] = React.useState([])

  React.useEffect(()=>{
    axios.get('http://localhost:3001/content')
    .then((data)=>setData(data.data))
  },[])



  return (
    <CardContainer>
      {data && data.map((it)=>(
        <CardItem {...it} key={it.id}/>
      ))}
    </CardContainer>
  )
}

export default CardPart

const CardContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 20px;
  row-gap: 60px;
`