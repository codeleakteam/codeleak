import React from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'

const Loader = () => {
  return (
    <LoaderContainer>
      <Spin />
    </LoaderContainer>
  )
}

const LoaderContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default Loader
