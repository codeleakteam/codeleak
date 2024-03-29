import React, { Component } from 'react'
import Editor from 'draft-js-plugins-editor'
import { styleMap } from './config'

class DraftjsEditor extends Component {
  render() {
    const { editorState, handleKeyCommand, placeholder, onChange } = this.props
    return (
      <Editor
        customStyleMap={styleMap}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        placeholder={placeholder}
        ref="editor"
        spellCheck={true}
      />
    )
  }
}

export default DraftjsEditor
