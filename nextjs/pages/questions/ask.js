import React, { Component } from 'react'
import TwoSideLayout from '../../components/TwoSideLayout'
import AskQuestion from '../../components/AskQuestion'
import AskGuide from '../../components/SideWidgets/AskGuide'

class Ask extends Component {
  render() {
    return (
      <div>
        <h3>Ask a question</h3>
        <TwoSideLayout left={<AskQuestion />} right={<AskGuide />} />
      </div>
    )
  }
}

export default Ask
