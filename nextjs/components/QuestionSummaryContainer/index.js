import React from 'react'
import QuestionSummary from '../QuestionSummary'

import classes from './index.scss'

const QuestionSummaryContainer = ({ loggedIn }) => {
  return (
    <div className={!loggedIn ? classes['summary__container--logged-out'] : null}>
      <QuestionSummary />
      <QuestionSummary />
      <QuestionSummary />
      <QuestionSummary />
      <QuestionSummary />
      <QuestionSummary />
      <QuestionSummary />
      <QuestionSummary />
      <QuestionSummary />
      <QuestionSummary />
    </div>
  )
}

export default QuestionSummaryContainer
