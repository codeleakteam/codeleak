import React from 'react'
import PropTypes from 'prop-types'
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

TwoSideLayout.propTypes = {
  mainSectionElement: PropTypes.element.isRequired,
  rightSectionElement: PropTypes.element,
}

export default TwoSideLayout
