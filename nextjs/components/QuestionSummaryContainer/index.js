import React from 'react'
import QuestionSummary from '../QuestionSummary'

import classes from './index.scss'

const QuestionSummaryContainer = ({ loggedIn, questions }) => {
  console.log(questions)

  return (
    <div className={!loggedIn ? classes['summary__container--logged-out'] : null}>
      {questions.map(question => {
        return (
          <QuestionSummary
            key={question.id}
            score={question.score}
            viewedTimes={question.viewed_times}
            answers={question.answers}
            title={question.title}
            createdAt={question.created_at}
            tags={question.tags}
            author={question.author.username}
            authorId={question.author.id}
            questionId={question.id}
            slug={question.slug}
          />
        )
      })}
    </div>
  )
}

export default QuestionSummaryContainer
