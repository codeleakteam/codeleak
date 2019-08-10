import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'
import UserSignature from '../UserSignature'

const Comment = ({
  id,
  created_at,
  username,
  reputation,
  avatar,
  content,
  score,
  upvoteComment,
  reportComment,
  updatedScore,
}) => {
  return (
    <Wrapper>
      <UserSignature
        id={id}
        username={username}
        avatar={avatar}
        reputation={reputation}
        postedAt={created_at}
        upvoteComment={upvoteComment}
      />
      <p>{content}</p>
      <ButtonContainer>
        <VoteButton onClick={() => upvoteComment()}>
          <VoteIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png" />
          <CounterValue>{updatedScore ? updatedScore : score}</CounterValue>
        </VoteButton>
        <VoteButton onClick={() => reportComment()}>
          <ReportIcon src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/50-512.png" />
        </VoteButton>
      </ButtonContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
`

const ButtonContainer = styled.div`
  margin-top: 8px;
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

const VoteIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 7px;
`
const ReportIcon = styled.img`
  width: 18px;
  height: 18px;
`

const CounterValue = styled.span`
  color: #4d4d4d;
  font-weight: bold;
`

Comment.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  reputation: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  upvoteComment: PropTypes.func.isRequired,
  reportComment: PropTypes.func.isRequired,
}

export default Comment
