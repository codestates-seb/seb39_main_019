import React,{useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import CardItem from './CardItem'
import PagiNation from './PagiNation'
import useStore from '../../store/filter'
import {TabText} from './TabText'

const CardPart = () => {
  const {index,filter} = useStore()
  const [data,setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postsPerPage, setPostsPerPage] = useState(10);
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

const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (data) => {
    let currentPosts = 0;
    currentPosts = data.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  return (
    <CardContainer>
      <div className='dataBox'>
      {data && currentPosts(data).map((it)=>(
        <CardItem {...it} key={it.id}/>
      ))}
      </div>
      <PageContainer>
        <PagiNation
          postsPerPage={postsPerPage}
          totalPosts={data.length}
          paginate={setCurrentPage}
        ></PagiNation>
      </PageContainer>
    </CardContainer>
  )
}


export default React.memo(CardPart)

const CardContainer = styled.div`
width: 100%;
display:flex;
flex-direction: column;
& .dataBox{
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 30px;
  row-gap: 50px;
}
`

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  
`