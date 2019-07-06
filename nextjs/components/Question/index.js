import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { message } from 'antd'
import Card from '../Card'
import TagWithLink from '../TagWithLink'
import Comment from '../Comment'
import UserSignature from '../UserSignature'
import PostCTAS from '../PostCTAS'
import moment from 'moment'
import { apiPost, apiPut } from '../../api'
import { convertFromRaw, EditorState, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import _ from 'lodash'

class Question extends Component {
  state = {
    editorState: null,
    comments: [],
    commentsReversed: [],
    commentSummary: true,
  }
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    repository_url: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    author: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }
  componentDidMount() {
    const { comments, description, author } = this.props
    const editorState = this.getDescription(description)
    this.setState({
      editorState: editorState,
      comments,
      commentsReversed: comments.reverse(),
    })
  }

  createAnswerFromHtml = () => {
    return {
      __html: stateToHTML(this.state.editorState.getCurrentContent()),
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
      const comment = _.get(res, 'data', null)
      // console.log('[submitComment]', { comment })
      if (comment) {
        this.setState(state => ({
          comments: [...state.comments, comment.comment],
          commentsReversed: [...state.commentsReversed, comment.comment].reverse(),
        }))
        message.success('Comment is successfully submited!')
      }
    } catch (error) {
      console.error('[submitComment]', { error })
      message.error('Internal server error')
    }
  }

  handleCommentSummary = () => {
    this.setState(state => ({ commentSummary: !state.commentSummary }))
  }

  upvoteComment = async (userId, commentId) => {
    try {
      const res = await apiPut.updateCommentScore('true', userId, 'QUESTION_COMMENT', commentId)
      let comment = _.get(res, 'data', null)
      if (comment) {
        let index = _.findIndex(this.state.comments, { id: comment.comment.id })
        let newArr = this.state.comments
        let newArrReversed = this.state.commentsReversed

        newArr.splice(index, 1, comment.comment)
        newArrReversed.splice(index, 1, comment.comment)

        this.setState({ comments: newArr, commentsReversed: newArrReversed })
        message.success('Comment score is successfully updated!')
      }
    } catch (error) {
      // console.log(error.response.message)

      message.error('Could not upvote comment!')
    }
  }

  reportComment = async (userId, commentId) => {
    try {
      await apiPost.reportComment(userId, 'QUESTION_COMMENT', commentId)
      message.success('Comment is successfully reported!')
    } catch (error) {
      console.error('[reportComment]', { error })
      message.error('Could not report comment!')
    }
  }

  render() {
    const {
      id,
      created_at,
      author,
      score,
      title,
      tags,
      repository_url,
      updateQuestionScore,
      updatedQuestionScore,
      authorReputation,
    } = this.props
    console.log(authorReputation)

    let reverseeed =
      this.state.comments.length > 3 ? this.state.commentsReversed.slice(0, 3) : this.state.commentsReversed
    const commentSummary = this.state.commentSummary ? reverseeed : this.state.comments
    const postedAt = moment(created_at).fromNow()
    const testLink = repository_url ? repository_url.replace('/s/', '/embed/') : null
    return (
      <Card>
        <Title>{title}</Title>
        <UserSignature
          id={author.id}
          username={author.username}
          reputation={authorReputation}
          postedAt={postedAt}
          avatar={author.avatar}
        />
        <TagsList>
          {tags.map(q => {
            return (
              <TagWithLink style={{ marginRight: '6px' }} url={`/tag/${q.slug}`} id={q.id} text={q.title} key={q.id} />
            )
          })}
        </TagsList>
        <Description>
          {this.state.editorState && <div dangerouslySetInnerHTML={this.createAnswerFromHtml()} />}
        </Description>
        <PostCTAS
          postType="question"
          submitComment={this.submitComment}
          updateScore={updateQuestionScore}
          id={id}
          score={score}
          updatedScore={updatedQuestionScore}
        />
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
          <ToggleAllComments onClick={this.handleCommentSummary}>
            {this.state.commentSummary ? 'view all' : 'hide'}
          </ToggleAllComments>
        )}
      </Card>
    )
  }
}

const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
`
const TagsList = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`

const Description = styled.div`
  margin-bottom: 15px;
`
const ToggleAllComments = styled.span`
  display: block;
  padding: 4px;
  text-align: right;
  line-height: 1;
  color: $antBlue;
  cursor: pointer;
`
export default Question
