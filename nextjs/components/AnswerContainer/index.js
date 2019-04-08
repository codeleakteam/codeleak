import React from 'react'
import Answer from '../Answer'

import classes from './index.scss'

const AnswerContainer = () => {
  return (
    <div className={classes.answers__container}>
      <h5 className={classes.answers__header}>Answers</h5>
      <Answer />
      <Answer />
    </div>
  )
}

export default AnswerContainer
