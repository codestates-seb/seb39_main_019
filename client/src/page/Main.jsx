import React from 'react'
import Layout from '../components/Layout/Layout'
import styled from 'styled-components'
import Slider from '../components/Carousel/Slider'
import Filter from '../components/Main/Filter'
import CardPart from '../components/Main/CardPart'
import Topbutton from '../components/Main/Topbutton'

const Main = () => {


 return (
   <Layout child={
     <MainContainer>
       <CarouselPart>
        <Slider/>
       </CarouselPart>
       <MainPart>
         <Filter/>
         <CardPart/>
       </MainPart>
       <Topbutton/>
     </MainContainer>
   }/>
 )
}

export default Main

const MainContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
padding-top: 60px;
`
const CarouselPart = styled.div`
width: 100%;
  

`
const MainPart = styled.div`
  padding: 15px;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-wrap:wrap;
`