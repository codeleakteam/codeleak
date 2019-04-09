import React from 'react'
import TwoSideLayout from '../../components/TwoSideLayout'
import AskQuestion from '../../components/AskQuestion'
import AskGuide from '../../components/SideWidgets/AskGuide'

import classes from '../../styles/askAndEdit/index.scss'

const Edit = props => {
  return (
    <div>
      <h3 className={classes.question__heading}>Edit question</h3>
      <TwoSideLayout left={<AskQuestion type="edit" />} right={<AskGuide />} />
    </div>
  )
}

export default Edit
