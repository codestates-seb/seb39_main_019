import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import styled,{css} from 'styled-components'
import axios from 'axios'
import useStore from '../store/post'


const PostDetail = () => {

const {title,body,location,personality,size
,setTitle,setBody,setLo,setPe,setSi} = useStore()
 const navigate = useNavigate()
 const {id} = useParams()
 const [data,setData] = React.useState([])
 const [isEdit,setIsEdit] = React.useState(false)
 console.log(location)
 
 const handleEdit = () => {
   setIsEdit(!isEdit)
   setTitle(data.title)
   setBody(data.content)
   setLo(data.guName)
   setPe(data.personality)
   setSi(data.size)
 }
 const onDelete = () => {
  if(window.confirm('정말 삭제 하시겠슴까?')){
    axios({
      method:'delete',
      url:`http://localhost:3001/content/${id}`
    })
    navigate('/main')
   }
  }
 const onSubmit =() =>{
  axios({
    method:'patch',
    url:`http://localhost:3001/content/${id}`,
    data:{
      title:title,
      content:body,
      guName:location,
      personality:personality,
      size:size,
    }
  })
  setIsEdit(!isEdit)
}

React.useEffect(() => {
   axios({
     method:'get',
     url:`http://localhost:3001/content/${id}`
   }).then((data)=>{
     setData(data.data)
    })
  },[isEdit])

  return (
    <Layout child ={
      <DetailContainer>
       <InnerContainer>
         <InnerDetail>
          <DetailTop>
            <TopTitle>
              <h1>{isEdit?<input value={title} onChange={(e)=>setTitle(e.target.value)}></input>:data.title}</h1>
              <div>
                {isEdit?<><button onClick={onSubmit}>저장</button>
                <button onClick={handleEdit}>취소</button></>:
                <><button onClick={handleEdit}>수정</button>
                <button onClick={onDelete}>삭제</button></>}
              </div>
            </TopTitle>
            <TopSubTitle>
              <span>빵댕이팡팡</span>
              <div>
                <img src=''/>
                <span>관심있어요</span>
              </div>
            </TopSubTitle>
          </DetailTop>
          <DetailMid>
            <div>
              <img src='https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG'></img>
              <div>
                <div>이름<span>빵순이</span></div>
                <div>나이<span>2 살</span></div>
                <div>성별<span>암컷</span></div>
                <div>견종<span>시고르자브종</span></div>
                {isEdit?<div>크기<select onChange={(e)=>setSi(e.target.value)}>
                  <option>선택해주세요</option>
                  <option value='LARGE'>대형견</option>
                  <option value='MIDDLE'>중형견</option>
                  <option value='SMALL'>소형견</option>
                  </select></div>:
                <div>크기<span>{data.size}</span></div>}
                {isEdit?<div>성격<select name='Pe' onChange={(e)=>setPe(e.target.value)}>
                  <option>선택해주세요</option>
                  <option value='ACTIVE'>활발함</option>
                  <option value='TIMID'>소심함</option>
                  <option value='SHY'>겁많음</option>
                  <option value='CUTE'>애교많음</option>
               </select></div>:<div>성격<span>{data.personality}</span></div>}
               {isEdit? <div>지역<input value={location} onChange={(e)=>setLo(e.target.value)}></input></div>:<div>지역<span>{data.guName}</span></div>}        
              </div>
            </div>
          </DetailMid>
          <DetailBottom>
            {isEdit?<><textarea value={body} onChange={(e)=>setBody(e.target.value)}></textarea></>:<div>{data.content}</div>}
          </DetailBottom>
         </InnerDetail>
       </InnerContainer>
      </DetailContainer>
    }/>
  )
}

export default PostDetail

const DetailContainer = styled.div`
  padding-top: 60px;
  max-width: 1280px;
  margin: 0 auto;
`
const InnerContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  @media screen and (max-width: 1200px){
    width: 93%;
  }
`

const InnerDetail = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 100px;
`
const DetailTop = styled.div`
  & div{
    display: flex;
    justify-content: space-between;
    & input{
      width: 100%;
      height: 100%;
      font-size: 30px;
      border: none;
      border-bottom: 1px solid #ddd;
      text-indent: 5px;
      &:focus {outline: none;}
    }
  }
`
const TopTitle = styled.div`
align-items: flex-start;
  & h1{
    font-size: 30px;
    flex: 9;
    @media screen and (max-width: 800px){
     font-size: 20px;
  }
  }
  & div{
      align-items: center;
    & button{
      flex: 1;
      padding: 10px 10px;
      border: none;
      border-radius: 5px;
      color: ${(props)=>props.theme.HeaderColor}; 
      background-color: ${(props)=>props.theme.HeLogoColor};
      &:hover{
        transform: scale(1.05);
      }
    }
    & button + button{
      margin-left: 10px;
    }
  }
`
const TopSubTitle =styled.div`
margin-top: 20px;
align-items: center;
  & div{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const DetailMid = styled.div`
width: 100%;
margin-top: 20px;
  & > div{
     width: 100%;
     display: flex;
     align-items: center;
     white-space: nowrap;
     @media screen and (max-width: 800px){
     width:100%;
     flex-direction: column;
     align-items: flex-start;
  }
    & img{
      width: 400px;
      height: 400px;
      border: 1px solid #eee;
      border-radius: 10px;
      @media screen and (max-width: 800px){
      width: 100%;
     }
      @media screen and (max-width: 480px){
      width: 100%;
      height: 300px;
     }
    }
    & div{
      width: 100%;
      margin:30px 0;
      font-size: 17px;
      padding-left: 50px;
      font-family: GmarketSansMedium;
      @media screen and (max-width: 800px){
      padding-left: 0px;
      margin: 20px 0;
  }
      
      & span{
        display: inline-block;
        font-size: 16px;
        margin-left: 15px;
        color: #6b6b6b;
        font-family: S_CoreDream_3Light;
      }
    }
  }
  & input{
      width: calc(89% - 30px);
      height: 30px;
      margin: 0px;
      border: none;
      border-bottom: 1px solid #ddd;
      text-indent: 5px;
      &:focus {outline: none;}
     }
     & select{
      width: calc(89% - 30px);
      height: 30px;
      border: 1px solid #ddd;
      border-radius: 5px;
     }
     & input,select,textarea{
    margin-left: 10px;
   }
  `
const DetailBottom = styled.div`
width: 100%;
height: 100%;
  & textarea{
      width: 100%;
      height: 150px;
      font-size: 15px;
      border: 1px solid #ddd;
      resize: none;
      padding: 5px;
      border-radius: 5px;
      &:focus {outline: none;}
     }
` ;