import React, { Component } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { message } from 'antd'
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
    authToken: PropTypes.string,
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
    codeleakUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      reputation: PropTypes.number.isRequired,
      avatar: PropTypes.string,
      full_name: PropTypes.string,
    }),
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
      message.loading('Posting', 5)
      const res = await apiPost.sendComment('ANSWER_COMMENT', answer_id, author_id, content, this.props.authToken)
      const comment = _.get(res, 'data.comment', null)
      if (!comment) throw new Error('No comment object available')
      this.setState(state => ({
        comments: [...state.comments, comment],
        commentsReversed: [...state.commentsReversed, comment].reverse(),
      }))
      message.destroy()
      message.success('Your comment has been added')
    } catch (error) {
      message.destroy()
      console.error('[submitComment]', { error })
      message.error('Internal server error')
    }
  }

  handleCommentSummary = () => this.setState(prevState => ({ commentSummary: !prevState.commentSummary }))

  upvoteComment = async (userId, commentId) => {
    try {
      message.loading('Voting', 5)
      const res = await apiPut.updateCommentScore('true', userId, 'ANSWER_COMMENT', commentId, this.props.authToken)
      let comment = _.get(res, 'data', null)
      if (!comment) throw new Error('No comment object available')
      let index = _.findIndex(this.state.comments, { id: comment.comment.id })
      let newArr = this.state.comments
      let newArrReversed = this.state.commentsReversed

      newArr.splice(index, 1, comment.comment)
      newArrReversed.splice(index, 1, comment.comment)
      this.setState({ comments: newArr, commentsReversed: newArrReversed })
      message.destroy()
      message.success('Thank you for voting')
    } catch (err) {
      message.destroy()
      console.error('[upvoteComment]', { err })
      const errMsg = _.get(err, 'response.data.message', 'Internal server error')
      message.error(errMsg)
    }
  }

  reportComment = async (commentAuthorID, commentID) => {
    try {
      message.loading('Reporting', 5)
      await apiPost.reportComment(commentAuthorID, 'ANSWER_COMMENT', commentID, this.props.authToken)
      message.destroy()
      message.success('Thank you for reporting')
    } catch (err) {
      message.destroy()
      const errMsg = _.get(err, 'response.data.message', 'Internal server error')
      message.error(errMsg)
    }
  }

  updateAnswerScore = async (type, answerId, userId) => {
    try {
      message.loading('Voting', 5)
      const res = await apiPut.updateAnswerScore(type, answerId, userId, this.props.authToken)
      const score = _.get(res, 'data.answer.score', null)
      const authorReputation = _.get(res, 'data.answer.author.reputation', null)
      if (!score) throw new Error('Retrieved score is null or undefined')
      this.setState({ answerScore: score, authorReputation })
      message.destroy()
      message.success('Thank you for voting')
    } catch (err) {
      message.destroy()
      console.error('[updateAnswerScore]', { err })
      const errMsg = _.get(err, 'response.data.message', 'Internal server error')
      message.error(errMsg)
    }
  }

  render() {
    const { codeleakUser, id, score, author, repository_url, created_at, description } = this.props
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

          <iframe
            src={repository_url}
            style={{
              width: '100%',
              height: '90vh',
              border: 0,
              'border-radius': '4px',
              overflow: 'hidden',
            }}
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          />

          <PostCTAS
            postType="answer"
            updateScore={this.updateAnswerScore}
            id={id}
            score={score}
            updatedScore={this.state.answerScore}
            submitComment={this.submitComment}
            disableAnswerWithCode={true}
            amIAuthor={codeleakUser ? codeleakUser.id === author.id : false}
            isLoggedIn={!!codeleakUser}
            authorID={author.id}
          />
        </Card>

        {comments.map((c, i) => {
          return (
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
                upvoteComment={() => this.upvoteComment(c.author.id, c.id)}
                reportComment={() => this.reportComment(c.author.id, c.id)}
                amIAuthor={codeleakUser ? codeleakUser.id === c.author.id : false}
                isLoggedIn={!!codeleakUser}
              />
              {this.state.comments.length > 3 && (
                <span onClick={this.handleCommentSummary}>{this.state.commentSummary ? 'view all' : 'hide'}</span>
              )}
            </Card>
          )
        })}
      </React.Fragment>
    )
  }
}

const Description = styled.div`
  margin-bottom: 16px;
`
export default Answer
