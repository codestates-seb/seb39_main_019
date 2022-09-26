import ReactLoading from 'react-loading'
import styled from 'styled-components'
import React from 'react'

const Loader = () => {
  return (
    <LoderWrap>
      <ReactLoading type='spin' color="#A593E0" width={'30px'}/>
    </LoderWrap>
  )
}

export default React.memo(Loader)

const LoderWrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`