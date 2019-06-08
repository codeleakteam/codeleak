import React from 'react'
import styled from 'styled-components'

const TwoSideLayout = ({ mainSectionElement, rightSectionElement }) => {
  return (
    <Wrapper>
      <MainSection>{mainSectionElement}</MainSection>
      <SideSection>{rightSectionElement}</SideSection>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  color: black;
`

const MainSection = styled.div`
  width: 75%;
  @media screen and (max-width: 740px) {
    width: 100%;
  }
`

const SideSection = styled.section`
  width: 20%;
  @media screen and (max-width: 740px) {
    display: none;
  }
`

export default TwoSideLayout
