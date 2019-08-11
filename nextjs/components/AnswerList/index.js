import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Answer from '../Answer'

const AnswerList = ({ answers }) => {
  return (
    <Wrapper>
      {answers.map(answer => {
        return <Answer key={answer.id} id={answer.id} {...answer} />
      })}
    </Wrapper>
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
      question: PropTypes.number.isRequired,
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

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

export default AnswerList
