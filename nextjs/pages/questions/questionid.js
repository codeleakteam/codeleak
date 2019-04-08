import React, { Component } from 'react'
import TwoSideLayout from '../../components/TwoSideLayout'
import PopularTags from '../../components/SideWidgets/PopularTags'
import Question from '../../components/Question'
import AnswerContainer from '../../components/AnswerContainer'

// import classes from '../../styles/question/index.scss'

class QuestionFullPage extends Component {
  render() {
    let leftSide = (
      <React.Fragment>
        <Question />
        <AnswerContainer />
      </React.Fragment>
    )

    return (
      <div>
        <TwoSideLayout left={leftSide} right={<PopularTags />} />
      </div>
    )
  }
}

export default QuestionFullPage
