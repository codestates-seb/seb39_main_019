import React from 'react'
import styled from 'styled-components'
import CardItem from './CardItem'
import axios from 'axios'
import useStore from '../../store/filter'
import {TabText} from './TabText'



const CardPart = () => {
  const {index} = useStore()
  const [data,setData] = React.useState([])
  // axios.get('http://localhost:3001/content')
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
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 30px;
  row-gap: 50px;
`