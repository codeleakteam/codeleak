import React, { Component } from 'react'
import TwoSideLayout from '../components/TwoSideLayout'
import PopularTags from '../components/SideWidgets/PopularTags'
import Question from '../components/Question'
import AnswerContainer from '../components/AnswerContainer'
import AddAnswer from '../components/AddAnswer'
import _ from 'lodash'
import { Spin } from 'antd'

import { apiGet, apiPut, apiPost } from '../api'

// import classes from '../../styles/question/index.scss'

class QuestionFullPage extends Component {
  state = {
    questionScore: null,
    answers: [],
    answersLoaded: false,
  }

  componentDidMount() {
    this.setState({ answers: this.props.question.question.answers, answersLoaded: true })
  }

  updateQuestionScore = async (type, questionId, userId) => {
    try {
      const res = await apiPut.updateQuestionScore(type, questionId, userId)
      let score = _.get(res, 'data.question.score', '')
      if (score) {
        this.setState({ questionScore: score })
      }
    } catch (error) {
      console.log('erorko')
    }
  }

  sendAnswerOnQuestion = async (authorId, questionId, editor, description, repository) => {
    try {
      const res = await apiPost.sendAnswer(authorId, questionId, editor, description, repository)
      let answer = _.get(res, 'data', {})
      if (answer) {
        this.setState({
          answers: [...this.state.answers, answer],
        })
      }
    } catch (error) {
      console.log('erorko')
    }
  }

  render() {
    const { question } = this.props
    let leftSide = (
      <React.Fragment>
        <Question
          data={question}
          updateQuestionScore={this.updateQuestionScore}
          updatedQuestionScore={this.state.questionScore}
        />
        {!this.state.answersLoaded ? (
          <Spin
            tip="Getting answers for you!"
            style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          />
        ) : null}
        <AnswerContainer answers={this.state.answers} />
        <AddAnswer sendAnswer={this.sendAnswerOnQuestion} questionId={this.props.question.question.id} />
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
    const question = _.get(res, 'data', {})
    return {
      question,
    }
  } catch (error) {
    console.log('error', error)
  }
  return {
    question: {},
  }
}

export default QuestionFullPage
