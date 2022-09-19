import React from 'react'
import Layout from '../components/Layout/Layout'
import styled from 'styled-components'
import Slider from '../components/Carousel/Slider'
import Filter from '../components/Main/Filter'


const Main = () => {

 return (
   <Layout child={
     <MainContainer>
       <CarouselPart>
        <Slider/>
       </CarouselPart>
       <MainPart>
         <Filter/>
        카드섹션 파트입니다.
       </MainPart>
     </MainContainer>
   }/>
 )
}

export default Main

const MainContainer = styled.div`
width: 100%;
`
const CarouselPart = styled.div`
width: 100%;
  

`
const MainPart = styled.div`
  padding: 15px 15px;
  max-width: 1280px;
  margin: 0 auto;
`