import React, { Component } from 'react'
import TwoSideLayout from '../components/TwoSideLayout'
import PopularTags from '../components/SideWidgets/PopularTags'
import Question from '../components/Question'
import AnswerContainer from '../components/AnswerContainer'
import AddAnswer from '../components/AddAnswer'
import { Editor, EditorState } from 'draft-js'
import _ from 'lodash'

import { apiGet } from '../api'

// import classes from '../../styles/question/index.scss'

class QuestionFullPage extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  handleEditorChange = editorState => {
    this.setState({ editorState })
  }

  render() {
    const { question } = this.props.question
    let leftSide = (
      <React.Fragment>
        <Question data={this.props.question} />
        <AnswerContainer answers={question.answers} />
        <AddAnswer editorState={this.state.editorState} handleEditorChange={this.handleEditorChange} />
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
}

export default QuestionFullPage
