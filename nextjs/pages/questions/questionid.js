import React, { Component } from 'react'
import TwoSideLayout from '../../components/TwoSideLayout'
import PopularTags from '../../components/SideWidgets/PopularTags'
import Question from '../../components/Question'

// import classes from '../../styles/question/index.scss'

class QuestionFullPage extends Component {
  render() {
    let leftSide = (
      <>
        <Question />
      </>
    )

    return (
      <div>
        <TwoSideLayout left={leftSide} right={<PopularTags />} />
      </div>
    )
  }
}

export default QuestionFullPage
