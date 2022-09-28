import React from 'react'
import useScroll from '../../hooks/useScroll'
import styled from 'styled-components'

const Topbutton = () => {
  
  const handleTop = () => {
    window.scrollTo(0, 0)
  }
  const {scrollY} = useScroll()
  return (
    <TopCircle>
       {scrollY > 650?<div onClick={handleTop}>⬆️</div>:null}
    </TopCircle>
  )
}

export default Topbutton

const TopCircle = styled.div`
  width: 100%;
  position: sticky;
  bottom:8%;
  & div{
  position: sticky;
  left: 93%;
  width: 50px;
  height: 50px;
  font-size: 20px;
  border-radius: 100%;
  border: 1px solid #eee;
  background-color: ${(props)=>props.theme.HeaderColor};
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  @media screen and (max-width: 400px){
    display: none;
  }
  }
`