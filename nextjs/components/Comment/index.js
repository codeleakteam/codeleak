import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'
import UserSignature from '../UserSignature'

const Comment = ({ id, created_at, username, reputation, avatar, content, score, upvoteComment, reportComment }) => {
  return (
    <Wrapper>
      <UserSignature id={id} username={username} avatar={avatar} reputation={reputation} postedAt={created_at} />
      <p>{content}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
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
