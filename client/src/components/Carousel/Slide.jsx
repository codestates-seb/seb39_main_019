import React from 'react'
import styled from 'styled-components'

const Slide = ({img}) => {
  return (
    <IMG>
      <div style={{backgroundImage: `url(${img})`}}/>
    </IMG>
  )
}

export default Slide

const IMG = styled.div`
  width: 100%;

& div{
  display: block;
  width: 100vw;
  height: 100%;
  background-size: cover;
  background-position: center;
}
`