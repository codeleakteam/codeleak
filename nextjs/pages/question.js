import React, { Component } from 'react'
import TwoSideLayout from '../components/TwoSideLayout'
import PopularTags from '../components/SideWidgets/PopularTags'
import Question from '../components/Question'
import AnswerContainer from '../components/AnswerContainer'
import AddAnswer from '../components/AddAnswer'
import _ from 'lodash'
import { Alert, message } from 'antd'
import Loader from '../components/Loader'

import { apiGet, apiPut, apiPost } from '../api'

// import classes from '../../styles/question/index.scss'

class QuestionFullPage extends Component {
  state = {
    questionScore: null,
    answers: [],
    answersLoaded: false,
  }

  componentDidMount() {
    if (!this.props.error) {
      this.setState({ answers: this.props.question.question.answers, answersLoaded: true })
    }
  }

  updateQuestionScore = async (type, questionId, userId) => {
    try {
      const res = await apiPut.updateQuestionScore(type, questionId, userId)
      let score = _.get(res, 'data.question.score', null)
      if (score) {
        this.setState({ questionScore: score })
      } else {
        message.error('Could not update question score')
      }
    } catch (error) {
      message.error('Could not update question score')
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
    const { question } = this.props
    let leftSide = (
      <React.Fragment>
        {this.props.error && <Alert message="Could not load question!" type="error" />}
        {!this.state.answersLoaded ? (
          <React.Fragment>
            <Loader />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Question
              data={question}
              updateQuestionScore={this.updateQuestionScore}
              updatedQuestionScore={this.state.questionScore}
            />
            <AnswerContainer answers={this.state.answers} />
            <AddAnswer sendAnswer={this.sendAnswerOnQuestion} questionId={this.props.question.question.id} />
          </React.Fragment>
        )}
      </React.Fragment>
    )
    return (
      <div>
        <TwoSideLayout left={leftSide} />
      </div>
    )
  }
}

QuestionFullPage.getInitialProps = async function({ query }) {
  try {
    let id = query.title
    let res = await apiGet.getQuestion(id)
    const question = _.get(res, 'data', null)
    if (!question) {
      return {
        error: true,
      }
    }
    return {
      question,
      error: false,
    }
  } catch (error) {
    return {
      error: true,
    }
  }
  return {
    question: {},
  }
}

export default QuestionFullPage
