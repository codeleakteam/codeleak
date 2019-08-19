import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Head from 'next/head'
import { Alert, message } from 'antd'
import Question from '../components/Question'
import AnswerList from '../components/AnswerList'
import { apiGet, apiPut } from '../api'
import { withAuthSync } from '../helpers/functions/auth'

class QuestionFullPage extends Component {
  static propTypes = {
    authToken: PropTypes.string.isRequired,
  }

  static async getInitialProps({ query }) {
    try {
      const res = await apiGet.getQuestion({ questionID: query.id })
      const question = _.get(res, 'data.question', null)

      if (!question) throw new Error('No question object available')
      return {
        question,
        error: false,
      }
    } catch (err) {
      return {
        error: true,
      }
    }
  }

  state = {
    questionScore: null,
    answers: _.get(this.props, 'question.answers', []),
    authorReputation: _.get(this.props, 'question.author.reputation'),
  }

  updateQuestionScore = async (type, questionId, userID) => {
    try {
      const res = await apiPut.updateQuestionScore({ type, questionId, userID, token: this.props.authToken })
      const score = _.get(res, 'data.question.score', null)
      const authorReputation = _.get(res, 'data.question.author.reputation', null)

      if (!score) throw new Error('No score on updaeQuestionScore received')
      this.setState(state => ({ questionScore: score, authorReputation }))
    } catch (error) {
      console.error('[updateQuestionScore]', { error })
      message.error('Internal server error')
    }
  }

  render() {
    const { question, error } = this.props
    return (
      <div>
        <Head>
          <title>{!error ? question.title : 'Internal server error'}</title>
        </Head>

        {error && <Alert message="Internal server error" type="error" />}
        {!error && (
          <React.Fragment>
            <Question
              id={question.id}
              slug={question.slug}
              title={question.title}
              description={question.description}
              score={question.score}
              created_at={question.created_at}
              repository_url={question.repository_url}
              comments={question.comments}
              tags={question.tags}
              author={question.author}
              updateQuestionScore={this.updateQuestionScore}
              updatedQuestionScore={this.state.questionScore}
              authorReputation={this.state.authorReputation}
              authToken={this.props.authToken}
            />
            <AnswerList answers={question.answers} />
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default withAuthSync(QuestionFullPage)
