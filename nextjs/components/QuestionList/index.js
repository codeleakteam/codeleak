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
            comments={question.comments}
            title={question.title}
            description={question.description}
            createdAt={question.created_at}
            tags={question.tags}
            authorUsername={question.author.username}
            authorFullName={question.author.full_name}
            authorId={question.author.id}
            questionId={question.id}
            slug={question.slug}
            authorAvatar={question.author.avatar}
          />
        )
      })}
    </div>
  )
}

export default QuestionList
