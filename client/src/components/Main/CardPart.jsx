import React from 'react'
import styled from 'styled-components'
import CardItem from './CardItem'
import PagiNation from './PagiNation'
import axios from 'axios'
import useStore from '../../store/filter'
import {TabText} from './TabText'

const CardPart = () => {
  const {index,filter} = useStore()
  const [data,setData] = React.useState([])

  // axios.get('http://localhost:3001/content')
  // axios.get('http://43.200.20.180:8080/v1/posts')
  React.useEffect(()=>{
    axios.get('http://localhost:3001/content')
    // 전체 지역일 경우
    // 지역이 선택될 경우 
    .then((data)=>{
      if(filter==='전체 지역'||filter===''){
        if(index===0){
          setData(data.data.sort((a,b)=>b.id-a.id))
        }else if(index < 4){
          setData(data.data.sort((a,b)=>b.id-a.id).filter((it)=>it.size===TabText[index]))
        }else{
          setData(data.data.sort((a,b)=>b.id-a.id).filter((it)=>it.personality===TabText[index]))
        }
      }
      else if(filter!=='전체 지역'){
        if(index===0){
          setData(data.data.filter((it)=>it.guName === filter).sort((a,b)=>b.id-a.id))
        }else if(index < 4){
          setData(data.data.filter((it)=>it.guName === filter).sort((a,b)=>b.id-a.id).filter((it)=>it.size===TabText[index]))
        }else{
          setData(data.data.filter((it)=>it.guName === filter).sort((a,b)=>b.id-a.id).filter((it)=>it.personality===TabText[index]))
        }
      }
    })
},[index,filter])



  return (
    <CardContainer>
      {data && data.map((it)=>(
        <CardItem {...it} key={it.id}/>
      ))}
    </CardContainer>
  )
}


export default React.memo(CardPart)

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