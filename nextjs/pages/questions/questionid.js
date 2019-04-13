import React, { Component } from 'react'
import TwoSideLayout from '../../components/TwoSideLayout'
import PopularTags from '../../components/SideWidgets/PopularTags'
import Question from '../../components/Question'
import AnswerContainer from '../../components/AnswerContainer'
import AddAnswer from '../../components/AddAnswer'
import { Editor, EditorState } from 'draft-js'

// import classes from '../../styles/question/index.scss'

class QuestionFullPage extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  handleEditorChange = editorState => {
    this.setState({ editorState })
  }

  render() {
    let leftSide = (
      <React.Fragment>
        <Question />
        <AnswerContainer />
        <AddAnswer editorState={this.state.editorState} handleEditorChange={this.handleEditorChange} />
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
