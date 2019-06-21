import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Comment = ({ authorName, content, score, upvoteComment, reportComment }) => {
  return (
    <Wrapper>
      <Heading>
        <AuthorName>{authorName}</AuthorName>
        <PointsCounter>{score} points</PointsCounter>
      </Heading>
      <Row>
        <ControlsWrapper>
          <FontAwesomeIcon icon="angle-up" size="lg" onClick={upvoteComment} />
          <FontAwesomeIcon icon="ban" size="sm" onClick={reportComment} />
        </ControlsWrapper>
        <CommentContent>{content}</CommentContent>
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px solid $antGray;
  width: 100%;
  max-width: 450px;
  margin: 8px 0 0 auto;
  padding: 4px;
  &:last-child {
    margin-bottom: 0;
  }
`

const Row = styled.div`
  display: flex;
`
const Heading = styled.div`
  line-height: 1;
`

const AuthorName = styled.span`
  font-size: 13px;
  line-height: 14px;
  &:after {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: black;
    color: black;
    display: inline-block;
    vertical-align: middle;
    margin: 0 8px;
  }
`

const PointsCounter = styled.span`
  font-size: 13px;
  line-height: 14px;
`

const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 8px;
  align-items: center;
`

const CommentContent = styled.span`
  font-size: 13px;
  line-height: 14px;
`

Comment.propTypes = {
  authorName: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  upvoteComment: PropTypes.func.isRequired,
  reportComment: PropTypes.func.isRequired,
}

export default Comment
