import React from 'react'
import styled from 'styled-components'
import Header from '../Header'
import Footer from '../Footer'

const Layout = ({child}) => {
  return (
    <LayoutContainer>
      <div className='layout top'>
        <Header/>
      </div>
      <div className='layout middle'>{child}</div>
      <div className='layout bottom'>
        <Footer/>
      </div>
    </LayoutContainer>
  )
}

export default Layout

const LayoutContainer = styled.div`

`