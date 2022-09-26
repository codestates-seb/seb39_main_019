import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import styled from 'styled-components'

const Layout = ({child}) => {
  return (
    <LayoutWrap>
      <div className='layout top'>
        <Header/>
      </div>
      <div className='layout middle'>{child}</div>
      <div className='layout bottom'>
        <Footer/>
      </div>
    </LayoutWrap>
  )
}

export default Layout

const LayoutWrap = styled.div`
  position: relative;
  width: 100%;
  .middle{
    width: 100%;
  }

`