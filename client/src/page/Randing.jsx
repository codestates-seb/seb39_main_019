import React from 'react'
import Layout from '../components/Layout/Layout';
import styled from 'styled-components';
import Section1 from '../components/Randing/Section1';
import Section2 from '../components/Randing/Section2';

const Randing = () => {


  return (
    <Layout child={
      <LandingContainer>
        <Section1/>
        <Section2/>
      </LandingContainer>
    }/>
  )
}

export default Randing

const LandingContainer =styled.div`
  padding-top: 60px;
`