import React from 'react'
import styled from 'styled-components'

const AskGuide = () => {
  return <Wrapper>HOW TO....</Wrapper>
}

const Wrapper = styled.div`
  border: 1px solid ${props => props.theme.antGrey};
  padding: 8px;
  border-radius: 4px;
`

export default AskGuide
