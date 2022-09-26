import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import useStore from '../../store/filter'
import {TabText} from './TabText'


const Filter = () => {
  const {setIndex} = useStore()
  const [currentTab,setCurrentTab] = React.useState(0)
  

  const handleFilter = (index) => {
    const find = TabText.findIndex((it)=>it === index.target.textContent)
    setCurrentTab(find)
    setIndex(find)
    }

  return (
    <FilterContainer>
      <FilterBox>
        <Filters>
        {TabText.map((it,idx)=>(
          <button className={currentTab===idx? 'buttonFocus':'button'} onClick={handleFilter} key={idx}>{it}</button>
        ))}
        </Filters>
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
  @media screen and (max-width:952px){
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
`
const Filters = styled.div`

  button{
    padding: 10px 15px;
    margin-right: 10px;
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