import React from 'react'
import QuestionSummary from '../QuestionSummary'

import classes from './index.scss'

const QuestionSummaryContainer = ({ loggedIn, answers }) => {
  return (
    <div className={!loggedIn ? classes['summary__container--logged-out'] : null}>
      {answers.map(answer => {
        return (
          <QuestionSummary
            key={answer.id}
            score={answer.score}
            // comments={answer.comments}
            title={answer.title}
            createdAt={answer.created_at}
            tags={answer.tags}
            author={answer.author.username}
          />
        )
      })}
    </div>
  )
}

export default QuestionSummaryContainer
