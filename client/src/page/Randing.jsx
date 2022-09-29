import React from 'react'
import Layout from '../components/Layout/Layout';
import styled from 'styled-components';
import Section1 from '../components/Randing/Section1';
import Section2 from '../components/Randing/Section2';
import Section3 from '../components/Randing/Section3';
import Section4 from '../components/Randing/Section4';

const Randing = () => {


  return (
    <Layout child={
      <LandingContainer>
        <Section1/>
        <Section2/>
        <Section3/>
        <Section4/>
      </LandingContainer>
    }/>
  )
}

export default Randing

const LandingContainer =styled.div`
  padding-top: 60px;
`