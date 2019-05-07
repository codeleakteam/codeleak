import React, { Component } from 'react'
import TwoSideLayout from '../components/TwoSideLayout'
import PopularTags from '../components/SideWidgets/PopularTags'
import Question from '../components/Question'
import AnswerContainer from '../components/AnswerContainer'
import AddAnswer from '../components/AddAnswer'
import _ from 'lodash'

import { apiGet, apiPut, apiPost } from '../api'

// import classes from '../../styles/question/index.scss'

class QuestionFullPage extends Component {
  state = {
    questionScore: null,
    answers: [],
  }

  componentDidMount() {
    this.setState({ answers: this.props.question.question.answers })
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
      console.log('da vidimo repsonse', res)

      let testko = [...this.state.answers, answer]
      console.log('testinjo', testko)

      // if (answer) {
      //   setTimeout(() => {
      //     this.setState({
      //       answers: [...this.state.answers, answer],
      //     })
      //   }, 2000)
      // }
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
    // this.setState({ questions: question })
    // console.log(question)

    return {
      question,
    }
  } catch (error) {
    console.log('error', error)
  }
}

export default QuestionFullPage
