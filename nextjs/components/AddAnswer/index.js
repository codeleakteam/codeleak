import React from 'react'
import { EditorState, RichUtils, convertToRaw } from 'draft-js'
import { Button } from 'antd'
import Editor from 'draft-js-plugins-editor'

import addLinkPlugin from '../draftjsPlugin/addLinkPlugin'

import classes from './index.scss'

// Draftjs bullshits
const INLINE_STYLES = [
  { icon: 'bold', style: 'BOLD' },
  { icon: 'italic', style: 'ITALIC' },
  { icon: 'underline', style: 'UNDERLINE' },
  { icon: 'code', style: 'CODE' },
  // { icon: 'link', style: 'LINK' },
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
  // draftjs plugins
  plugins = [
    addLinkPlugin
  ]
  onAddLink = () => {
    const editorState = this.state.editorState
    const selection = editorState.getSelection();
    const link = window.prompt('Paste the link')

    if(!link){
      this.onChange(RichUtils.toggleLink(editorState, selection, null));
      return 'handled'
    }

    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link})
    const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
  }
  // draftjs handler
  onChange = editorState => {
    this.setState({ editorState })
  }
  // draftjs handler
  handleKeyCommand = command => {
    const { editorState } = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }
  // draftjs handler
  toggleInlineStyle = inlineStyle => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle))
  }
  // clear state after submit
  cleanStateAfterSubmit = () => {
    this.setState({ editorState: EditorState.createEmpty() })
  }

  render() {
    const { editorState } = this.state

    return (
      <div className={classes.answer__container}>
        {this.state.editor && (
          <React.Fragment>
            <h2>Add answer</h2>
            <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} addLink={this.onAddLink} />
            <button id="link_url" onClick={this.onAddLink}>ADD LINK</button>
            <div>
              <Editor
                customStyleMap={styleMap}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                placeholder="Answer"
                ref="editor"
                spellCheck={true}
                plugins={this.plugins}
              />
            </div>
            <Button
              type="primary"
              onClick={() =>
                {
                this.props.sendAnswer(
                  1,
                  this.props.questionId,
                  1,
                  JSON.stringify(convertToRaw(editorState.getCurrentContent())),
                  'repositoryurl'
                );
                this.cleanStateAfterSubmit();
                }
              }
            >
              Send
            </Button>
          </React.Fragment>
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
      <StyleButton active={currentStyle.has('LINK')} onToggle={props.onToggle} onClick={() => props.addLink} />
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
