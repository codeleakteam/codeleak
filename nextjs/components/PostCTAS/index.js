import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'antd'
import AddComment from '../AddComment'

export default function PostCTAS({ postType, id, updateScore, submitComment, score }) {
  return (
    <Wrapper>
      <Row>
        <VoteButton onClick={() => updateScore('true', id, 1)}>
          <VoteIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png" />
          <CounterValue>{score}</CounterValue>
        </VoteButton>
        <VoteButton onClick={() => updateScore('false', id, 1)}>
          <DownvoteIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png" />
        </VoteButton>
      </Row>
      <Row>
        {postType === 'question' && (
          <Button type="primary" style={{ marginRight: '6px' }}>
            Provide an answer
          </Button>
        )}
        <AddComment objectId={id} submitComment={submitComment} />
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: center;
  justify-content: space-between;
`
const Row = styled.div`
  display: flex;
  align-items: center;
`
const VoteButton = styled.button`
  padding: 0.25rem 0.75rem;
  border: 1px solid #e0e0e0;
  background: 0 0;
  border-radius: 1000px;
  cursor: pointer;
  line-height: 1;
  margin-right: 0.5rem;
  outline: 0;
`
const CounterValue = styled.span`
  color: #4d4d4d;
  font-weight: bold;
`
const VoteIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 7px;
`
const DownvoteIcon = styled(VoteIcon)`
  transform: rotate(180deg);
  margin: 0;
`

PostCTAS.propTypes = {
  postType: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  updateScore: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
}
