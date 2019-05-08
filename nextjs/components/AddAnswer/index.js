import React from 'react'
import { EditorState, RichUtils, convertToRaw } from 'draft-js'
import { Button, Input } from 'antd'
import Editor from 'draft-js-plugins-editor'
import { INLINE_STYLES } from '../../helpers/configs/draftjs'

import addLinkPlugin from '../draftjs/addLinkPlugin'

import InlineStyleControls from '../draftjs/InlineStyleControls'

import classes from './index.scss'

// Draftjs bullshits

class AddAnswer extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
    editor: false,
    addUrlOpen: false,
    urlValue: '',
  }
  // draftjs bug fix
  componentDidMount() {
    this.setState({ editor: true })
  }
  // draftjs plugins
  plugins = [addLinkPlugin]

  onAddLink = () => {
    const editorState = this.state.editorState
    const selection = editorState.getSelection()
    // const link = window.prompt('Paste the link')
    const link = this.state.urlValue

    if (!link) {
      this.onChange(RichUtils.toggleLink(editorState, selection, null))
      return 'handled'
    }

    const content = editorState.getCurrentContent()
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link })
    const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity')
    const entityKey = contentWithEntity.getLastCreatedEntityKey()
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
    // handleKeyCommand
    return false
  }
  // draftjs handler
  toggleInlineStyle = inlineStyle => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle))
  }
  // clear state after submit
  cleanStateAfterSubmit = () => {
    this.setState({ editorState: EditorState.createEmpty(), addUrlOpen: false, urlValue: '' })
  }

  handleUrlTab = () => {
    this.setState(state => {
      return {
        addUrlOpen: !state.addUrlOpen,
      }
    })
  }

  handleUrlChange = e => {
    this.setState({ urlValue: e.target.value })
  }

  render() {
    const { editorState } = this.state

    return (
      <div className={classes.answer__container}>
        {this.state.editor && (
          <React.Fragment>
            <h2>Add answer</h2>
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
              addLink={this.onAddLink}
              openUrlTab={this.handleUrlTab}
              addUrlOpen={this.state.addUrlOpen}
            />
            {this.state.addUrlOpen && (
              <div className={classes.url__container}>
                <Input className={classes.url__input} value={this.state.urlValue} onChange={this.handleUrlChange} />
                <Button id="link_url" onClick={this.onAddLink}>
                  ADD LINK
                </Button>
              </div>
            )}
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
              onClick={() => {
                this.props.sendAnswer(
                  1,
                  this.props.questionId,
                  1,
                  JSON.stringify(convertToRaw(editorState.getCurrentContent())),
                  'repositoryurl'
                )
                this.cleanStateAfterSubmit()
              }}
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
// const InlineStyleControls = props => {
//   var currentStyle = props.editorState.getCurrentInlineStyle()
//   return (
//     <div className={classes.answer__buttons}>
//       {INLINE_STYLES.map(type => (
//         <StyleButton
//           key={type.icon}
//           active={currentStyle.has(type.style)}
//           icon={type.icon}
//           onToggle={props.onToggle}
//           style={type.style}
//         />
//       ))}
//       <StyleButton onToggle={props.openUrlTab} icon="link" active={props.addUrlOpen ? true : false} />
//     </div>
//   )
// }

// toggle button
// const StyleButton = props => {
//   const onToggle = e => {
//     e.preventDefault()
//     props.onToggle(props.style)
//   }
//   let type = ''
//   if (props.active) {
//     type += 'primary'
//   }
//   return <Button type={type} onMouseDown={onToggle} icon={props.icon} className={classes.answer__button} />
// }

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
