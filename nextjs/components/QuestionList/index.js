import React from 'react'
import QuestionSummary from '../QuestionSummary'

const QuestionList = ({ questions }) => {
  return (
    <div>
      {questions.map(question => {
        return (
          <QuestionSummary
            key={question.id}
            score={question.score}
            viewedTimes={question.viewed_times}
            answers={question.answers}
            title={question.title}
            description={question.description}
            createdAt={question.created_at}
            tags={question.tags}
            authorUsername={question.author.username}
            authorId={question.author.id}
            questionId={question.id}
            slug={question.slug}
          />
        )
      })}
    </div>
  )
}

export default QuestionList