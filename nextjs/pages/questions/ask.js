import React, { Component } from 'react'
import TwoSideLayout from '../../components/TwoSideLayout'
import AskQuestion from '../../components/AskQuestion'
import AskGuide from '../../components/SideWidgets/AskGuide'

import classes from '../../styles/ask/index.scss'

class Ask extends Component {
  render() {
    return (
      <div>
        <h3 className={classes.question__heading}>Ask a question</h3>
        <TwoSideLayout left={<AskQuestion />} right={<AskGuide />} />
      </div>
    )
  }
}

export default Ask
