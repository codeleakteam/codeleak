import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { message } from 'antd'
import Card from '../Card'
import TagWithLink from '../TagWithLink'
import Comment from '../Comment'
import UserSignature from '../UserSignature'
import PostCTAS from '../PostCTAS'
import { apiPost, apiPut } from '../../api'
import _ from 'lodash'

class Question extends Component {
  state = {
    editorState: null,
    comments: [],
    commentsReversed: [],
    commentSummary: true,
    updatedScore: '',
  }
  static propTypes = {
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
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
    this.setState({
      comments,
    })
  }

  submitComment = async (question_id, author_id, content) => {
    try {
      const res = await apiPost.sendComment('QUESTION_COMMENT', question_id, author_id, content)
      const comment = _.get(res, 'data.comment', null)
      // console.log('[submitComment]', { data: res.data, comment })
      if (!comment) throw new Error('Comment null or undefined')
      this.setState(state => ({
        comments: [comment, ...state.comments],
      }))
      message.success('Comment is successfully submited!')
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
        this.setState({ updatedScore: comment.comment.score })
        message.success('Comment score is successfully updated!')
      }
    } catch (err) {
      console.error('[upvoteCommeent]', { err })
      message.error('Internal server error')
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
      slug,
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
    

    return (
      <Wrapper>
        <Card>
          <Title>{title}</Title>
          <UserSignature
            id={author.id}
            username={author.username}
            reputation={authorReputation}
            postedAt={created_at}
            avatar={author.avatar}
          />
          <TagsList>
            {tags.map(q => {
              return (
                <TagWithLink
                  style={{ marginRight: '6px' }}
                  url={`/tag/${q.slug}`}
                  id={q.id}
                  text={q.title}
                  key={q.id}
                />
              )
            })}
          </TagsList>
          <Description>
            <div dangerouslySetInnerHTML={{ __html: this.props.description }} />
          </Description>
          <iframe
            src={repository_url}
            style={{
              width: '100%',
              height: '90vh',
              border: 0,
              borderRadius: 4,
              overflow: 'hidden',
            }}
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          />

          <PostCTAS
            postType="question"
            object={{
              id,
              slug,
            }}
            submitComment={this.submitComment}
            updateScore={updateQuestionScore}
            id={id}
            score={score}
            updatedScore={updatedQuestionScore}
          />
        </Card>
        {this.state.commentSummary &&
          this.state.comments.slice(0, 3).map((c, i) => (
            <Card hoverable={true} isComment={true} key={i}>
              <Comment
                key={c.id}
                id={c.id}
                created_at={c.created_at}
                username={c.author.username}
                avatar={c.author.avatar}
                reputation={c.author.reputation}
                content={c.content}
                score={c.score}
                updatedScore={this.state.updatedScore}
                upvoteComment={() => this.upvoteComment(1, c.id)}
                reportComment={() => this.reportComment(1, c.id)}
              />
            </Card>
          ))}
        {!this.state.commentSummary &&
          this.state.comments.map((c, i) => (
            <Card hoverable={true} isComment={true} key={i}>
              <Comment
                key={c.id}
                id={c.id}
                created_at={c.created_at}
                username={c.author.username}
                avatar={c.author.avatar}
                reputation={c.author.reputation}
                content={c.content}
                score={c.score}
                updatedScore={this.state.updatedScore}
                upvoteComment={() => this.upvoteComment(1, c.id)}
                reportComment={() => this.reportComment(1, c.id)}
              />
            </Card>
          ))}

        {this.state.comments.length > 3 && (
          <ToggleAllComments onClick={this.handleCommentSummary}>
            {this.state.commentSummary ? 'view all' : 'hide'}
          </ToggleAllComments>
        )}
      </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const Description = styled.div`
  margin-bottom: 16px;
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
