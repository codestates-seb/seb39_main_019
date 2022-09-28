import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import useStore from '../../store/filter'
import {TabText} from './TabText'
import { GuFilter } from './GuFilter'

 
const Filter = () => {
  const {setIndex,setFilter} = useStore()
  const [currentTab,setCurrentTab] = React.useState(0)
  
  const handleGuFilter = (index) => {
    setFilter(index.target.value)
  }

  const handleFilter = (index) => {
    const find = TabText.findIndex((it)=>it === index.target.textContent)
    setCurrentTab(find)
    setIndex(find)
    }

  return (
    <FilterContainer>
      <FilterBox>
        <div>
          <select onChange={handleGuFilter}>
            {GuFilter.map((it,idx)=>(
              <option key={idx}>{it}</option>
            ))}
          </select>
          <Filters>
          {TabText.map((it,idx)=>(
            <button className={currentTab===idx? 'buttonFocus':'button'} onClick={handleFilter} key={idx}>{it}</button>
          ))}
          </Filters>
        </div>
        <Link to={'/post'}><button>글 작성하기</button></Link>
      </FilterBox>
    </FilterContainer>
  )
}

export default Filter

const FilterContainer = styled.div`
width: 100%;
padding: 40px 0; 

  button{
    padding: 10px 15px;
    margin-right: 10px;
    line-height: 30px;
    font-size: 18px;
    border: none;
    border-radius:10px;
    color: ${(props)=>props.theme.HeaderColor}; 
    background-color: ${(props)=>props.theme.HeLogoColor};
    transition: 0.3s;
    white-space: nowrap;

    &:hover{
      background-color: ${(props)=>props.theme.HeaderColor};
      color: ${(props)=>props.theme.textColor};
      transform: scale(1.05);
    }
  }
  
`
const FilterBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* padding-right: 200px; */
  @media screen and (max-width:953px){
    flex-direction:column;
    button{
      margin-top: 10px;
    }
  }
  @media screen and (max-width:463px){
    flex-direction:column;
    margin: -30px 0;
    button{
      font-size: 15px;
      padding: 3px 5px;
    }
  }
  & >div{
    display: flex;
    & select{
      border-radius: 10px;
      margin-right: 10px;
      border: none;
      font-size: 16px;
      height: 50px;
      /* margin-top: 10px; */
      text-align: center;
      cursor: pointer;
      option {
        color: red;
        background-color: red;
      }
      &:focus {outline: none}
      @media screen and (max-width:953px){
      margin-top: 10px;
      height: 115px;
     }
     @media screen and (max-width:531px){
      font-size: 15px;
      height: 180px;
     }
     @media screen and (max-width:463px){
      font-size: 15px;
      height: 86px;
     }
     @media screen and (max-width:407px){
      font-size: 15px;
      height: 137px;
     }
    }
  }
`
const Filters = styled.div`

  button{
    padding: 10px 15px;
    margin-right: 10px;
    margin-bottom: 5px;
    line-height: 30px;
    font-size: 18px;
    border: none;
    border-radius:10px;
    &:hover{
      background-color: ${(props)=>props.theme.HeLogoColor};
      color: ${(props)=>props.theme.HeaderColor}
    }
  }
  .button{
      color: ${(props)=>props.theme.textColor}; 
      background-color: ${(props)=>props.theme.HeaderColor};
    }
    @media screen and (max-width:463px){
      button{
        font-size: 15px;
        padding: 3px 5px;
      }
    }
`