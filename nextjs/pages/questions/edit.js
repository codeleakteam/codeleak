import React from 'react'
import styled from 'styled-components'
import TwoSideLayout from '../../components/TwoSideLayout'
import AskQuestion from '../../components/AskQuestion'
import AskGuide from '../../components/SideWidgets/AskGuide'

const Edit = () => {
  return (
    <div>
      <Title>Edit question</Title>
      <TwoSideLayout mainSectionElement={<AskQuestion type="edit" />} rightSectionElement={<AskGuide />} />
    </div>
  )
}

const Title = styled.h3`
  font-size: 36px;
  line-height: 22px;
  color: black;
`

export default Edit
