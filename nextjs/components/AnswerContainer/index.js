import React from 'react'
import Answer from '../Answer'

import classes from './index.scss'

const AnswerContainer = ({ answers }) => {
  return (
    <div className={classes.answers__container}>
      {answers.map(answer => {
        return (
          <Answer
            key={answer.id}
            answerId={answer.id}
            answer={answer}
            answerDescription={answer.description}
            authorId={answer.author.id}
            authorUsername={answer.author.username}
            score={answer.score}
            createdAt={answer.created_at}
            {...answer}
          />
        )
      })}
    </div>
  )
}

export default AnswerContainer
