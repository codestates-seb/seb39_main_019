import React from 'react'
import Layout from '../components/Layout/Layout'
import styled from 'styled-components'

const Main = () => {
 return (
   <Layout child={
     <MainContainer>메인입니다</MainContainer>
   }/>
 )
}

export default Main

const MainContainer = styled.div`

`