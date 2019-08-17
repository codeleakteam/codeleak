import React, { Component } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Menu, message } from 'antd'
import Comment from '../Comment'
import UserSignature from '../UserSignature'
import PostCTAS from '../PostCTAS'
import Card from '../Card'
import { apiPost, apiPut } from '../../api'

class Answer extends Component {
  state = {
    editorState: null,
    comments: [],
    commentsReversed: [],
    commentSummary: true,
    answerScore: null,
    authorReputation: _.get(this.props, 'author.reputation'),
  }

  static propTypes = {
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
  }

  componentDidMount() {
    this.setState({
      comments: this.props.comments,
      commentsReversed: this.props.comments.reverse(),
      questionScore: this.props.score,
    })
  }

  submitComment = async (answer_id, author_id, content) => {
    try {
      const res = await apiPost.sendComment('ANSWER_COMMENT', answer_id, author_id, content)
      const comment = _.get(res, 'data.comment', null)
      if (!comment) throw new Error('No comment object available')
      this.setState(state => ({
        comments: [...state.comments, comment],
        commentsReversed: [...state.commentsReversed, comment].reverse(),
      }))
    } catch (error) {
      console.error('[submitComment]', { error })
      message.error('Internal server error')
    }
  }

  handleCommentSummary = () => this.setState(prevState => ({ commentSummary: !prevState.commentSummary }))

  upvoteComment = async (userId, commentId) => {
    try {
      const res = await apiPut.updateCommentScore('true', userId, 'ANSWER_COMMENT', commentId)
      let comment = _.get(res, 'data', null)
      if (!comment) throw new Error('No comment object available')
      let index = _.findIndex(this.state.comments, { id: comment.comment.id })
      let newArr = this.state.comments
      let newArrReversed = this.state.commentsReversed

      newArr.splice(index, 1, comment.comment)
      newArrReversed.splice(index, 1, comment.comment)

      this.setState({ comments: newArr, commentsReversed: newArrReversed })
    } catch (error) {
      console.error('[upvoteComment]', { error })
      message.error('Internal server error')
    }
  }

  reportComment = async (userId, commentId) => {
    try {
      await apiPost.reportComment(userId, 'ANSWER_COMMENT', commentId)
      message.success('Comment is successfully reported!')
    } catch (error) {
      message.error(error.response.data.message)
    }
  }

  updateAnswerScore = async (type, answerId, userId) => {
    try {
      const res = await apiPut.updateAnswerScore(type, answerId, userId)
      const score = _.get(res, 'data.answer.score', null)
      const authorReputation = _.get(res, 'data.answer.author.reputation', null)
      if (!score) throw new Error('Retrieved score is null or undefined')
      this.setState({ answerScore: score, authorReputation })
    } catch (error) {
      console.error('[updateAnswerScore]', { error })
      message.error('Internal server error')
    }
  }

  render() {
    const { id, score, author, repository_url, created_at, description } = this.props
    const reverseeed =
      this.state.comments.length > 3 ? this.state.commentsReversed.slice(0, 3) : this.state.commentsReversed
    const comments = this.state.commentSummary ? reverseeed : this.state.comments

    return (
      <React.Fragment>
        <Card>
          <UserSignature
            id={author.id}
            username={author.username}
            avatar={author.avatar}
            reputation={this.state.authorReputation}
            postedAt={created_at}
          />

          <Description dangerouslySetInnerHTML={{ __html: description }} />

          {/* <iframe
            src={repository_url}
            style={{
              width: '100%',
              height: '90vh',
              border: 0,
              'border-radius': '4px',
              overflow: 'hidden',
            }}
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          /> */}

          <PostCTAS
            postType="answer"
            updateScore={this.updateAnswerScore}
            id={id}
            score={score}
            updatedScore={this.state.answerScore}
            submitComment={this.submitComment}
            disableAnswerWithCode={true}
          />
        </Card>

        {comments.map((c, i) => (
          <Card isComment={true} key={i}>
            <Comment
              key={c.id}
              id={c.id}
              created_at={c.created_at}
              username={c.author.username}
              avatar={c.author.avatar}
              reputation={c.author.reputation}
              content={c.content}
              score={c.score}
              upvoteComment={() => this.upvoteComment(1, c.id)}
              reportComment={() => this.reportComment(1, c.id)}
            />
            {this.state.comments.length > 3 && (
              <span onClick={this.handleCommentSummary}>{this.state.commentSummary ? 'view all' : 'hide'}</span>
            )}
          </Card>
        ))}
      </React.Fragment>
    )
  }
}

const Description = styled.div`
  margin-bottom: 16px;
`
export default Answer
