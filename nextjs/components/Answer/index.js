import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, message } from 'antd'
import moment from 'moment'
import Comment from '../Comment'
import UserSignature from '../UserSignature'
import PostCTAS from '../PostCTAS'
import Card from '../Card'
import { convertFromRaw, EditorState, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { apiPost, apiPut } from '../../api'

class Answer extends Component {
  state = {
    editorState: null,
    comments: [],
    commentsReversed: [],
    commentSummary: true,
    questionScore: null,
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
    const description = this.getDescription(this.props.description)
    this.setState({
      comments: this.props.comments,
      commentsReversed: this.props.comments.reverse(),
      questionScore: this.props.score,
      editorState: description,
    })
  }

  getDescription = description => {
    try {
      const richTextJson = JSON.parse(description)
      return EditorState.createWithContent(convertFromRaw(richTextJson))
    } catch (err) {
      return EditorState.createWithContent(ContentState.createFromText(description))
    }
  }

  createAnswerFromHtml = () => {
    let editorState = this.state.editorState
    let html = stateToHTML(editorState.getCurrentContent())
    return {
      __html: html,
    }
  }

  submitComment = async (question_id, author_id, content) => {
    try {
      const res = await apiPost.sendComment('ANSWER_COMMENT', question_id, author_id, content)
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
      const comment = _.get(res, 'data.comment', null)
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
      message.error('Could not report comment!')
    }
  }

  updateAnswerScore = async (type, questionId, userId) => {
    try {
      const res = await apiPut.updateAnswerScore(type, questionId, userId)
      const score = _.get(res, 'data.answer.score', null)
      if (!score) throw new Error('Retrieved score is null or undefined')
      this.setState({ questionScore: score })
    } catch (error) {
      console.error('[updateAnswerScore]', { error })
      message.error('Internal server error')
    }
  }

  render() {
    const { id, score, question, author, repository_url, created_at } = this.props
    const { editorState } = this.state
    const reverseeed =
      this.state.comments.length > 3 ? this.state.commentsReversed.slice(0, 3) : this.state.commentsReversed
    const commentSummary = this.state.commentSummary ? reverseeed : this.state.comments
    const postedAt = moment(created_at).fromNow()
    //  const testLink = repository_url ? repository_url.replace('/s/', '/embed/') : null

    return (
      <Card>
        <UserSignature id={author.id} username={author.username} reputation={author.reputation} postedAt={postedAt} />
        {editorState && <div style={{ marginBottom: '10px' }} dangerouslySetInnerHTML={this.createAnswerFromHtml()} />}
        
        <PostCTAS postType="answer" updateScore={this.updateAnswerScore} id={id} score={score} />
        {commentSummary.map(c => (
          <Comment
            key={c.id}
            id={c.id}
            authorName={c.author.username}
            content={c.content}
            score={c.score}
            upvoteComment={() => this.upvoteComment(1, c.id)}
            reportComment={() => this.reportComment(1, c.id)}
          />
        ))}
        {this.state.comments.length > 3 && (
          <span onClick={this.handleCommentSummary}>{this.state.commentSummary ? 'view all' : 'hide'}</span>
        )}
      </Card>
    )
  }
}

export default Answer
