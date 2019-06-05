import React from 'react'
import Answer from '../Answer'

import classes from './index.scss'

const AnswerContainer = ({ answers }) => {
  return (
    <div className={classes.answers__container}>
      {answers.map(answer => {
        return <Answer key={answer.id} id={answer.id} answer={answer} {...answer} />
      })}
    </div>
  )
}

export default AnswerContainer
