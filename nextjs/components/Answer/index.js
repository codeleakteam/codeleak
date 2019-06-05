import React, { Component } from 'react'
import { Button, Icon, Dropdown, Menu, message } from 'antd'
import Link from 'next/link'
import Comment from '../Comment'
import timeAgo from '../../helpers/functions/timeAgo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { convertFromRaw, EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import AddComment from '../AddComment'
import { apiPost, apiPut } from '../../api'

import classes from './index.scss'

class Answer extends Component {
  // console.log(EditorState.createWithContent(convertFromRaw(JSON.parse(answer.description))))
  state = {
    editorState: null,
    comments: [],
    commentsReversed: [],
    commentSummary: true,
    answerScore: null,
  }

  componentDidMount() {
    let testinjo = JSON.parse(this.props.answerDescription)
    if (this.props.answer) {
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(testinjo)),
      })
    }
    // console.log(this.props)

    this.setState({
      comments: this.props.comments,
      commentsReversed: this.props.comments.reverse(),
      answerScore: this.props.answer.score,
    })

    // console.log(this.props.answer)
  }

  createAnswerFromHtml = () => {
    let editorState = this.state.editorState
    let html = stateToHTML(editorState.getCurrentContent())
    return {
      __html: html,
    }
  }

  submitComment = async (answer_id, author_id, content) => {
    try {
      const res = await apiPost.sendComment('ANSWER_COMMENT', answer_id, author_id, content)
      let comment = _.get(res, 'data', null)

      if (comment) {
        this.setState(state => ({
          comments: [...state.comments, comment.comment],
          commentsReversed: [...state.commentsReversed, comment.comment].reverse(),
        }))
      } else {
        message.error('Could not submit comment!')
      }
    } catch (error) {
      message.error('Could not submit comment!')
    }
  }

  handleCommentSummary = () => {
    this.setState(state => ({ commentSummary: !state.commentSummary }))
  }

  upvoteComment = async (userId, commentId) => {
    try {
      const res = await apiPut.updateCommentScore('true', userId, 'ANSWER_COMMENT', commentId)
      let comment = _.get(res, 'data.comment', null)
      let comment_id = _.get(res, 'data.comment.id', null)
      if (comment) {
        let index = _.findIndex(this.state.comments, { id: comment_id })
        let newArr = this.state.comments
        let newArrReversed = this.state.commentsReversed

        newArr.splice(index, 1, comment)
        newArrReversed.splice(index, 1, comment)

        this.setState({ comments: newArr, commentsReversed: newArrReversed })
        message.success('Comment score is successfully updated!')
      }
    } catch (error) {
      message.error(error.response.data.message)
    }
  }

  reportComment = async (userId, commentId) => {
    try {
      const res = await apiPost.reportComment(userId, 'ANSWER_COMMENT', commentId)
      let comment = _.get(res, 'data', null)
      if (comment) {
        message.success('Comment is successfully reported!')
      }
    } catch (error) {
      message.error(error.response.data.message)
    }
  }

  updateAnswerScore = async (type, answerId, userId) => {
    try {
      const res = await apiPut.updateAnswerScore(type, answerId, userId)
      let score = _.get(res, 'data.answer.score', null)

      if (score) {
        this.setState({ answerScore: score })
        message.success('Answer score is successfully updated!')
      } else {
        message.error('Could not update answer score!')
      }
    } catch (error) {
      message.error(error.response.data.message)
    }
  }

  render() {
    const { editorState, comments, commentsReversed, answerScore } = this.state
    const { answer, answerId, authorId, authorUsername, score, createdAt } = this.props

    let reverseeed = comments.length > 3 ? commentsReversed.slice(0, 3) : commentsReversed
    let commentSummary = this.state.commentSummary ? reverseeed : comments

    const answerOptions = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/">
            3rd menu item
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className={classes.answer__container}>
        <div className={classes.answer__info}>
          <div className={classes.answer__detail}>
            <Link href={`/profile/${authorId}`} as={`/profile/${authorId}/${authorUsername}`}>
              <div className={classes.answer__avatar}>
                <img
                  src={answer.author.avatar}
                  alt={answer.author.username}
                  className={classes['answer__avatar-img']}
                />
              </div>
            </Link>
            <span className={classes.answer__rep}>{score}</span>
          </div>
          <div className={classes['answer__user-info']}>
            <Link href={`/profile/${authorId}`} as={`/profile/${authorId}/${authorUsername}`}>
              <a>
                <span className={classes.answer__user}>{authorUsername}</span>
              </a>
            </Link>

            <span className={classes.answer__time}>{timeAgo(createdAt)}</span>
          </div>
        </div>
        <div className={classes['answer__tags-wrapper']}>
          <div>
            <Link href="/">
              <Button type="primary">Open in editor</Button>
            </Link>
          </div>
        </div>
        {editorState && <div className={classes.answer__text} dangerouslySetInnerHTML={this.createAnswerFromHtml()} />}
        <div className={classes.answer__controls}>
          <Button
            className={classes.answer__upvote}
            type="primary"
            onClick={() => this.updateAnswerScore('true', answerId, 1)}
          >
            Upvote
            <FontAwesomeIcon icon="angle-up" className={classes.answer__arrow} />
            <span className={classes.question__score} style={{ marginLeft: 8 }}>
              {answerScore}
            </span>
          </Button>
          <Button className={classes.answer__downvote} onClick={() => this.updateAnswerScore('false', answerId, 1)}>
            Downvote
          </Button>
          <Dropdown overlay={answerOptions}>
            <Icon type="more" style={{ fontSize: '30px' }} />
          </Dropdown>
        </div>
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
          <span className={classes['question__view-all-comments']} onClick={this.handleCommentSummary}>
            {this.state.commentSummary ? 'view all' : 'hide'}
          </span>
        )}

        <AddComment objectId={answerId} submitComment={this.submitComment} />
      </div>
    )
  }
}

export default Answer
