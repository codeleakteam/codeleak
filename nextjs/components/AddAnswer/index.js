import React from 'react'
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js'
import { Button } from 'antd'

import classes from './index.scss'

// Draftjs bullshits
const INLINE_STYLES = [
  { icon: 'bold', style: 'BOLD' },
  { icon: 'italic', style: 'ITALIC' },
  { icon: 'underline', style: 'UNDERLINE' },
  { icon: 'code', style: 'CODE' },
  { icon: 'link', style: 'LINK' },
]

class AddAnswer extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
    editor: false,
  }
  // draftjs bug fix
  componentDidMount() {
    this.setState({ editor: true })
  }
  // draftjs handlers
  onChange = editorState => {
    this.setState({ editorState })
  }

  handleKeyCommand = command => {
    const { editorState } = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }
  toggleInlineStyle = inlineStyle => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle))
  }

  render() {
    const { editorState } = this.state
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor'
    var contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        className += ' RichEditor-hidePlaceholder'
      }
    }

    return (
      <div className={classes.answer__container}>
        {this.state.editor && (
          <>
            <h2>Add answer</h2>
            <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} />
            <div className={className} onClick={this.focus}>
              <Editor
                customStyleMap={styleMap}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                placeholder="Tell a story..."
                ref="editor"
                spellCheck={true}
              />
            </div>
            <Button type="primary">Send</Button>
            <div>{JSON.stringify(convertToRaw(editorState.getCurrentContent()))}</div>
          </>
        )}
      </div>
    )
  }
}

// inline controls
const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle()
  return (
    <div className={classes.answer__buttons}>
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.icon}
          active={currentStyle.has(type.style)}
          icon={type.icon}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  )
}
// toggle button
const StyleButton = props => {
  const onToggle = e => {
    e.preventDefault()
    props.onToggle(props.style)
  }
  let type = ''
  if (props.active) {
    type += 'primary'
  }

  return <Button type={type} onMouseDown={onToggle} icon={props.icon} className={classes.answer__button} />
}
// Custom styles
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  LINK: {
    color: '#07C',
  },
}

export default AddAnswer
