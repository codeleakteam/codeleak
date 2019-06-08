import React from 'react'
import PropTypes from 'prop-types'
import Answer from '../Answer'

const AnswerList = ({ answers }) => {
  return (
    <div>
      {answers.map(answer => {
        return <Answer key={answer.id} id={answer.id} {...answer} />
      })}
    </div>
  )
}

AnswerList.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      repository_url: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      question: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      }),
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          content: PropTypes.string.isRequired,
          author: PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
          }),
        })
      ),
    })
  ),
}

export default AnswerList
