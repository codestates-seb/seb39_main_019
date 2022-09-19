import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '../Button'


const Filter = () => {
  const [currentTab,setCurrentTab] = React.useState(0)
  const filters = ['전체','# 대형견','# 중형견','# 소형견','# 수컷','# 암컷']

  const handleFilter = (index) => {
    const find = filters.findIndex((it)=>it === index.target.textContent)
    setCurrentTab(find)
    }

  return (
    <FilterContainer>
      <FilterBox>
        <Filters>
        {filters.map((it,idx)=>(
          <button className={currentTab===idx? 'buttonFocus':'button'} onClick={handleFilter} key={idx}>{it}</button>
        ))}
        </Filters>
        <Link to={'/post'}><Button text={'글 작성하기'}/></Link>
      </FilterBox>
    </FilterContainer>
  )
}

export default Filter

const FilterContainer = styled.div`
    padding: 40px 0;
  
`
const FilterBox = styled.div`
  display: flex;
  justify-content: space-between;
`

const Filters = styled.div`
  button{
    padding: 5px 10px;
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
    .buttonFocus{
      background-color: ${(props)=>props.theme.HeLogoColor};
      color: ${(props)=>props.theme.HeaderColor}
    }
`