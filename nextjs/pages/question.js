import React, { Component } from 'react'
import _ from 'lodash'
import Head from 'next/head'
import { Alert, message } from 'antd'
import TwoSideLayout from '../components/TwoSideLayout'
import Question from '../components/Question'
import AnswerList from '../components/AnswerList'
import AddAnswer from '../components/AddAnswer'
import { apiGet, apiPut, apiPost } from '../api'

class QuestionFullPage extends Component {
  static async getInitialProps({ query }) {
    try {
      const res = await apiGet.getQuestion(query.id)
      const question = _.get(res, 'data.question', null)
      console.log('[getInitialProps]', { question })
      if (!question) throw new Error('No question object available')
      return {
        question,
        error: false,
      }
    } catch (error) {
      return {
        error: true,
      }
    }
  }
  state = {
    questionScore: null,
    answers: _.get(this.props, 'question.answers', []),
  }

  updateQuestionScore = async (type, questionId, userId) => {
    try {
      const res = await apiPut.updateQuestionScore(type, questionId, userId)
      const score = _.get(res, 'data.question.score', null)
      if (!score) throw new Error('No score on updaeQuestionScore received')
      this.setState({ questionScore: score })
    } catch (error) {
      console.error('[updateQuestionScore]', { error })
      message.error('Internal server error')
    }
  }

  sendAnswerOnQuestion = async (authorId, questionId, editor, description, repository) => {
    try {
      const res = await apiPost.sendAnswer(authorId, questionId, editor, description, repository)
      let answer = _.get(res, 'data', null)
      if (answer) {
        this.setState({
          answers: [...this.state.answers, answer],
        })
      } else {
        message.error('Could not send answer')
      }
    } catch (error) {
      message.error('Could not send answer')
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
          <TwoSideLayout
            mainSectionElement={
              <QuestionWithAnswersWrapper
                answers={this.state.answers}
                sendAnswerOnQuestion={this.sendAnswerOnQuestion}
                updateQuestionScore={this.updateQuestionScore}
                questionScore={this.state.questionScore}
                question={question}
              />
            }
          />
        )}
      </div>
    )
  }
}

function QuestionWithAnswersWrapper({ question, questionScore, updateQuestionScore, sendAnswerOnQuestion, answers }) {
  return (
    <React.Fragment>
      <Question
        id={question.id}
        title={question.title}
        description={question.description}
        score={question.score}
        created_at={question.created_at}
        repository_url={question.repository_url}
        updateQuestionScore={updateQuestionScore}
        updatedQuestionScore={questionScore}
        comments={question.comments}
        tags={question.tags}
        author={question.author}
      />
      <AnswerList answers={answers} />
      <AddAnswer questionId={question.id} sendAnswer={sendAnswerOnQuestion} />
    </React.Fragment>
  )
}

export default QuestionFullPage
