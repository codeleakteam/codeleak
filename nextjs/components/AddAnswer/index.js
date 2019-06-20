import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { EditorState, RichUtils, convertToRaw } from 'draft-js'
import { Button } from 'antd'
import DraftjsEditor from '../draftjs'
import addLinkPlugin from '../draftjs/addLinkPlugin'
import InlineStyleControls from '../draftjs/InlineStyleControls'
import UrlTab from '../draftjs/UrlTab'

class AddAnswer extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
    editor: false,
    addUrlOpen: false,
    urlValue: '',
  }

  static propTypes = {
    sendAnswer: PropTypes.func.isRequired,
    questionId: PropTypes.number.isRequired,
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
    const { editorState, addUrlOpen, editor, urlValue } = this.state
    const { sendAnswer, questionId } = this.props
    return (
      <Wrapper>
        {editor && (
          <React.Fragment>
            <h2>Add answer</h2>
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
              openUrlTab={this.handleUrlTab}
              addUrlOpen={addUrlOpen}
            />
            {addUrlOpen && <UrlTab url={urlValue} handleUrlChange={this.handleUrlChange} onAddLink={this.onAddLink} />}
            <DraftjsEditor
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              plugins={this.plugins}
              placeholder="Add answer"
              onChange={this.onChange}
            />
            <Button
              type="primary"
              onClick={() => {
                sendAnswer(
                  1,
                  questionId,
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
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.9rem;
  margin-bottom: 16px;
  background: white;
`
export default AddAnswer
