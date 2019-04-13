import React from 'react'
import { Editor, EditorState } from 'draft-js'

const AddAnswer = props => {
  return <Editor editorState={props.editorState} onChange={props.handleEditorChange} />
}

export default AddAnswer
