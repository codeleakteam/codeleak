import React, { Component } from 'react'
import styled from 'styled-components'
import TwoSideLayout from '../../components/TwoSideLayout'
import AskQuestion from '../../components/AskQuestion'
import AskGuide from '../../components/SideWidgets/AskGuide'
import { withAuthSync } from '../../helpers/functions/auth'

class AskQuestionPage extends Component {
  render() {
    return (
      <div>
        <Title>Submit question</Title>
        <AskQuestion />
      </div>
    )
  }
}

const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

export default withAuthSync(AskQuestionPage)
