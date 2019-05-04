import React, { Component } from 'react'
import TwoSideLayout from '../components/TwoSideLayout'
import PopularTags from '../components/SideWidgets/PopularTags'
import Question from '../components/Question'
import AnswerContainer from '../components/AnswerContainer'
import AddAnswer from '../components/AddAnswer'
import _ from 'lodash'

import { apiGet, apiPut } from '../api'

// import classes from '../../styles/question/index.scss'

class QuestionFullPage extends Component {
  state = {
    questionScore: null,
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

  render() {
    const { question } = this.props.question
    let leftSide = (
      <React.Fragment>
        <Question
          data={this.props.question}
          updateQuestionScore={this.updateQuestionScore}
          updatedQuestionScore={this.state.questionScore}
        />
        <AnswerContainer answers={question.answers} />
        <AddAnswer />
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
    // this.setState({ questionScore: 'test' })
    // console.log(question)

    return {
      question,
    }
  } catch (error) {
    console.log('error', error)
  }
}

export default QuestionFullPage
