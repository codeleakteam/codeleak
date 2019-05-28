import React, { Component } from 'react'
import { Button, Icon, Dropdown, Menu, message } from 'antd'
import Link from 'next/link'
import TagWithLink from '../TagWithLink'
import Comment from '../Comment'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import AddComment from '../AddComment'
import { apiPost, apiPut } from '../../api'
import { convertFromRaw, EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import _ from 'lodash'

import classes from './index.scss'

class Question extends Component {
  state = {
    editorState: null,
    comments: [],
    commentsReversed: [],
    commentSummary: true,
  }

  // shouldComponentUpdate(props, state) {
  //   return state.comments !== this.state.comments
  // }

  componentDidMount() {
    let questionUnformated = JSON.parse(this.props.data.question.description)
    if (this.props.data.question) {
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(questionUnformated)),
      })
    }
    this.setState({
      comments: this.props.data.question.comments,
      commentsReversed: this.props.data.question.comments.reverse(),
    })
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
      const res = await apiPost.sendComment('QUESTION_COMMENT', question_id, author_id, content)
      let comment = _.get(res, 'data', {})

      if (comment) {
        this.setState(state => ({
          comments: [...state.comments, comment.comment],
          commentsReversed: [...state.commentsReversed, comment.comment].reverse(),
        }))
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
      const res = await apiPut.updateCommentScore('true', userId, 'QUESTION_COMMENT', commentId)
      let comment = _.get(res, 'data', {})
      if (comment) {
        let index = _.findIndex(this.state.comments, { id: comment.comment.id })
        let newArr = this.state.comments
        let newArrReversed = this.state.commentsReversed

        newArr.splice(index, 1, comment.comment)
        newArrReversed.splice(index, 1, comment.comment)

        this.setState({ comments: newArr, commentsReversed: newArrReversed })
      }
    } catch (error) {
      message.error('Could not upvote comment!')
    }
  }

  reportComment = async (userId, commentId) => {
    try {
      const res = await apiPost.reportComment(userId, 'QUESTION_COMMENT', commentId)
      let comment = _.get(res, 'data', {})
      if (comment) {
        message.success('Comment is successfully reported!')
      }
    } catch (error) {
      message.error('Could not report comment!')
    }
  }
  render() {
    const { data, updateQuestionScore, updatedQuestionScore } = this.props
    const { question } = data
    let reverseeed =
      this.state.comments.length > 3 ? this.state.commentsReversed.slice(0, 3) : this.state.commentsReversed
    let commentSummary = this.state.commentSummary ? reverseeed : this.state.comments
    let formatDate = moment(question.created_at).fromNow()

    let testLink = question.repository_url.replace('/s/', '/embed/')

    const questionOptions = (
      <Menu>
        <Menu.Item>
          (1, id)
          <Link href="/questions/edit">
            <a>Edit question</a>
          </Link>
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
      <div className={classes.question__container}>
        <h3 className={classes.question__name}>{question.title}</h3>
        <div className={classes.question__info}>
          <div className={classes.question__detail}>
            <Link href={`/profile/${question.author.id}`}>
              <div className={classes.question__avatar}>
                <img
                  src={question.author.avatar}
                  alt={question.author.username}
                  className={classes['question__avatar-img']}
                />
              </div>
            </Link>
            <span className={classes.question__rep}>{question.author.reputation}</span>
          </div>
          <div className={classes['question__user-info']}>
            <Link href={`/profile/${question.author.id}`}>
              <a>
                <span className={classes.question__user}>{question.author.username}</span>
              </a>
            </Link>

            <span className={classes.question__time}>{formatDate}</span>
          </div>
        </div>
        <div className={classes['question__tags-wrapper']}>
          <div>
            {question.tags.map(q => {
              return <TagWithLink url={`/tag/${q.slug}`} id={q.id} text={q.title} key={q.id} />
            })}
          </div>
          <div>
            <Link href="/">
              <Button type="primary">Open in editor</Button>
            </Link>
          </div>
        </div>
        <div className={classes.question__text}>
          {this.state.editorState && <div dangerouslySetInnerHTML={this.createAnswerFromHtml()} />}
        </div>
        {question.repository_url && (
          <iframe
            src={`${testLink}?fontsize=14`}
            title={question.title}
            style={{ width: '100%', height: 500, border: 0, borderRadius: 4, overflow: 'hidden' }}
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          />
        )}
        <div className={classes.question__controls}>
          <Button
            className={classes.question__upvote}
            type="primary"
            onClick={() => updateQuestionScore('true', question.id, 1)}
          >
            Upvote
            <FontAwesomeIcon icon="angle-up" className={classes.question__arrow} />
            <span className={classes.question__score}>
              {updatedQuestionScore ? updatedQuestionScore : question.score}
            </span>
          </Button>
          <Button className={classes.question__downvote} onClick={() => updateQuestionScore('false', question.id, 1)}>
            Downvote
          </Button>
          <Dropdown overlay={questionOptions}>
            <Icon type="more" style={{ fontSize: '30px' }} />
          </Dropdown>
        </div>
        <div />
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

        <AddComment objectId={question.id} submitComment={this.submitComment} />
      </div>
    )
  }
}

Question.propTypes = {
  data: PropTypes.object.isRequired,
  updateQuestionScore: PropTypes.func.isRequired,
}

export default Question
