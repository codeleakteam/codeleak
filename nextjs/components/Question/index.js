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
import { convertFromRaw, EditorState, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import _ from 'lodash'

import classes from './index.scss'
import popularTagClasses from '../SideWidgets/PopularTags/index.scss'
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
    const description = this.getDescription(this.props.data.question.description)
    this.setState({
      editorState: description,
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

  getDescription = description => {
    try {
      const richTextJson = JSON.parse(description)
      return EditorState.createWithContent(convertFromRaw(richTextJson))
    } catch (err) {
      return EditorState.createWithContent(ContentState.createFromText(description))
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

    let testLink = question.repository_url ? question.repository_url.replace('/s/', '/embed/') : null

    return (
      <div className={classes.question__container}>
        <h3 className={classes.question__name}>{question.title}</h3>
        <div className={classes.question__info}>
          <div className={classes.question__row}>
            <Link
              href={`/profile/${question.author.id}`}
              as={`/profile/${question.author.id}/${question.author.username}`}
            >
              <img
                src="https://hashnode.imgix.net/res/hashnode/image/upload/v1559555582766/Bm5xyeBqE.jpeg?w=80&h=80&fit=crop&crop=faces&auto=format,enhance&q=60"
                alt={question.author.username}
                className={classes.question__authorAvatar}
              />
            </Link>
          </div>
          <div className={classes.question__column}>
            <div className={classes.question__row}>
              <Link
                href={`/profile/${question.author.id}`}
                as={`/profile/${question.author.id}/${question.author.username}`}
              >
                <a>
                  <span className={classes.question__authorUsername}>{question.author.username}</span>
                </a>
              </Link>

              <div className={classes.question__dotSeparator} />
              <span className={classes.question__time}>{formatDate}</span>
            </div>
            <div className={classes.question__row}>
              <img
                className={classes.question__reputationIcon}
                src="https://d3h1a9qmjahky9.cloudfront.net/app-5-min.png"
                alt="reputation"
              />

              <span className={classes.question__reputationCounter}>{question.author.reputation}</span>
            </div>
          </div>
        </div>
        <div className={classes['question__tags-wrapper']}>
          <div>
            {question.tags.map(q => {
              return (
                <TagWithLink
                  customClass={popularTagClasses.tag}
                  style={{ marginRight: '6px' }}
                  url={`/tag/${q.slug}`}
                  id={q.id}
                  text={q.title}
                  key={q.id}
                />
              )
            })}
          </div>
          {/* <div>
            <Link href="/">
              <Button type="primary">Open in editor</Button>
            </Link>
          </div> */}
        </div>
        <div className={classes.question__text}>
          {this.state.editorState && <div dangerouslySetInnerHTML={this.createAnswerFromHtml()} />}
        </div>
        {question.repository_url && (
          <iframe
            src={`${testLink}?fontsize=14`}
            title={question.title}
            style={{ width: '100%', height: 500, border: 0, borderRadius: 4, overflow: 'hidden', marginBottom: '15px' }}
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          />
        )}
        <div className={classes.question__controls}>
          <div className={classes.question__row}>
            <button className={classes.question__voteBtn} onClick={() => updateQuestionScore('true', question.id, 1)}>
              <img src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png" className={classes.question__voteIcon} />
              <span className={classes.question__counterValue}>{question.score}</span>
            </button>
            <button className={classes.question__voteBtn} onClick={() => updateQuestionScore('false', question.id, 1)}>
              <img
                src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png"
                className={[classes.question__voteIcon, classes.question__downVoteIcon].join(' ')}
              />
            </button>
          </div>
          <Button defualt onClick={this.showCommentField} className={classes.comment__button}>
            Edit question
          </Button>
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

        {/* <AddComment objectId={question.id} submitComment={this.submitComment} /> */}
      </div>
    )
  }
}

Question.propTypes = {
  data: PropTypes.object.isRequired,
  updateQuestionScore: PropTypes.func.isRequired,
}

export default Question
