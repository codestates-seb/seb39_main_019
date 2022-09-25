import React from 'react'
import styled from 'styled-components'
import CardItem from './CardItem'
import axios from 'axios'
import useStore from '../../store/filter'
import {TabText} from './TabText'



const CardPart = () => {
  const {index} = useStore()
  const [data,setData] = React.useState([])
  axios.get('http://localhost:3001/content')
  // axios.get('http://43.200.20.180:8080/v1/posts')
  React.useEffect(()=>{
    // axios.get('http://43.200.20.180:8080/v1/posts')
    axios.get('http://localhost:3001/content')
    .then((data)=>{
      if(index===0){
        setData(data.data.sort((a,b)=>b.id-a.id))
      }else if(index < 4){
        setData(data.data.sort((a,b)=>b.id-a.id).filter((it)=>it.size===TabText[index]))
      }else{
        setData(data.data.sort((a,b)=>b.id-a.id).filter((it)=>it.personality===TabText[index]))
      }
    })
  },[index])



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
  @media screen and (max-width:1160px){
    grid-template-columns: repeat(3, minmax(100px ,auto));
  }
  @media screen and (max-width:880px){
    grid-template-columns: repeat(2, minmax(100px ,auto));
  }
  @media screen and (max-width:750px){
    grid-template-columns: repeat(1, minmax(240px ,auto));
    row-gap: 20px;
  }
`