import React from 'react'
import styled from 'styled-components'
import CardItem from './CardItem'
import axios from 'axios'
import useStore from '../../store/filter'



const CardPart = () => {
  const {index} = useStore()
  const filters = ['전체','# 대형견','# 중형견','# 소형견','# 활발함','# 소심함','# 겁많음','# 애교많음']
  const [data,setData] = React.useState([])


  React.useEffect(()=>{
    axios.get('http://localhost:3001/content')
    .then((data)=>{
      if(index===0){
        setData(data.data.sort((a,b)=>b.id-a.id))
      }else if(index < 4){
        setData(data.data.sort((a,b)=>b.id-a.id).filter((it)=>it.size===filters[index]))
      }else{
        setData(data.data.sort((a,b)=>b.id-a.id).filter((it)=>it.personality===filters[index]))
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
`