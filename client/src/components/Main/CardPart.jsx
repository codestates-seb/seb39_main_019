import React,{useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import CardItem from './CardItem'
import PagiNation from './PagiNation'
import useStore from '../../store/filter'
import {TabText} from './TabText'

const CardPart = () => {
  const {index,filter,search,setSearch} = useStore()
  const [data,setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postsPerPage, setPostsPerPage] = useState(12);

  React.useEffect(()=>{
    axios.get('api/list/posts')
    .then((data)=>{
      if(search !== ''){
      return setData(data.data.sort((a,b)=>b.postId-a.postId).filter((it)=>it.title.includes(search)))
      }else{
        if(filter==='전체 지역'||filter===''){
          if(index===0){
            setData(data.data.sort((a,b)=>b.postId-a.postId))
          }else if(index < 4){
            setData(data.data.sort((a,b)=>b.postId-a.postId).filter((it)=>it.size===TabText[index]))
          }else{
            setData(data.data.sort((a,b)=>b.postId-a.postId).filter((it)=>it.personality===TabText[index]))
          }
        }
        else if(filter!=='전체 지역'){
          if(index===0){
            setData(data.data.filter((it)=>it.guName === filter).sort((a,b)=>b.postId-a.postId))
          }else if(index < 4){
            setData(data.data.filter((it)=>it.guName === filter).sort((a,b)=>b.postId-a.postId).filter((it)=>it.size===TabText[index]))
          }else{
            setData(data.data.filter((it)=>it.guName === filter).sort((a,b)=>b.postId-a.postId).filter((it)=>it.personality===TabText[index]))
          }
        }
      }
      setSearch('')
    })
},[index,filter,data.length,search])

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (data) => {
    let currentPosts = 0;
    currentPosts = data.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  return (
    <CardContainer>
      {data.length?
      <div className='dataBox'>
      {data && currentPosts(data).map((it)=>(
        <CardItem {...it} key={it.postId
        }/>
      ))}
      </div>
      :<div className='Xbox'>
       ｡°(°.◜ᯅ◝°)°｡ 등록된 글이 없어요 ㅜ,,ㅜ </div>}
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
& .Xbox{
  margin: 0 auto;
  margin-top: 15px;
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  width: 80%;
  height: 150px;
  border-radius: 10px;
  background-color: ${(props)=>props.theme.HeaderColor};
  color: ${(props)=>props.theme.textColor};
  @media screen and (max-width:692px ){
    font-size: 20px;
  }
  @media screen and (max-width:490px ){
    font-size: 14.5px;
  }
}
`

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  
`