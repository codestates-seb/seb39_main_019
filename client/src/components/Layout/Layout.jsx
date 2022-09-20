import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

const Layout = ({child}) => {
  return (
    <div>
      <div className='layout top'>
        <Header/>
      </div>
      <div className='layout middle'>{child}</div>
      <div className='layout bottom'>
        <Footer/>
      </div>
    </div>
  )
}

export default Layout
