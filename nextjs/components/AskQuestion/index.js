import React, { Component } from 'react'
import { Input, Button, message } from 'antd'
import InputLabel from '../InputLabel'
import TechnologyStack from '../TechnologyStack'
import QuestionTags from '../QuestionTags'
import { EditorState, RichUtils, convertToRaw } from 'draft-js'
import addLinkPlugin from '../draftjs/addLinkPlugin'
import InlineStyleControls from '../draftjs/InlineStyleControls'
import DraftjsEditor from '../draftjs'
import UrlTab from '../draftjs/UrlTab'
import QuestionTagsAutocomplete from '../QuestionTagsAutocomplete'
import { apiGet, apiPost } from '../../api'
import _ from 'lodash'
import Router from 'next/router'

import classes from './index.scss'

const { TextArea } = Input

class AskQuestion extends Component {
  state = {
    tags: [],
    selectedTags: [],
    inputVisible: false,
    inputValue: '',
    // draftjs shiet
    editorState: EditorState.createEmpty(),
    editor: false,
    urlValue: '',
    addUrlOpen: false,
    editorUrl: '',
  }

  // draftjs bug
  componentDidMount() {
    this.setState({ editor: true })
    this.getTags()
  }

  // draftjs plugins
  plugins = [addLinkPlugin]

  // draftjs link handler
  onAddLink = () => {
    const editorState = this.state.editorState
    const selection = editorState.getSelection()
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
  // draftjs url tab
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
  // tag handler
  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag)
    this.setState({ tags })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = () => {
    const { inputValue } = this.state
    let { tags } = this.state
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue]
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    })
  }

  getTags = async () => {
    try {
      const res = await apiGet.getTags()
      let tags = _.get(res, 'data', [])
      if (tags) {
        this.setState({ tags })
      }
    } catch (error) {
      console.log('erorko')
    }
  }

  handleTagChange = value => {
    const tagz = value.map(v => {
      return _.find(this.state.tags, { title: v })['id']
    })
    this.setState({ selectedTags: tagz })
  }

  sendQuestion = async (title, description, tags, author, editor, repoUrl) => {
    try {
      const res = await apiPost.sendQuestion(title, description, tags, author, editor, repoUrl)
      let questionId = _.get(res, 'data.id', null)
      let questionSlug = _.get(res, 'data.slug', null)
      if (questionId && questionSlug) {
        message.success('Successfully sent question!')
        Router.push(`/question/${questionId}/${questionSlug}`)
      }
    } catch (error) {
      message.error('Please fill data!')
      // console.log('erorko')
    }
  }

  handleTitle = e => {
    this.setState({ title: e.target.value })
  }

  handleEditorUrl = e => {
    this.setState({ editorUrl: e.target.value })
  }

  // ref used for focus
  saveInputRef = input => (this.input = input)

  render() {
    const { editorState, addUrlOpen, editor, urlValue } = this.state

    // const stringi = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    return (
      <div>
        <InputLabel text="Title" />
        <Input placeholder="Title" type="primary" value={this.state.title} onChange={this.handleTitle} />
        <InputLabel text="Description" />
        {editor && (
          <React.Fragment>
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
              placeholder="Description"
              onChange={this.onChange}
              height={300}
            />
          </React.Fragment>
        )}

        <InputLabel text="Technology stack" />
        <TechnologyStack />
        <InputLabel text="CodeSandbox url" />
        <Input
          placeholder="Enter codeSandbox url"
          type="primary"
          value={this.state.editorUrl}
          onChange={this.handleEditorUrl}
        />
        <InputLabel text="Tags" />

        {/* <QuestionTags
          handleClose={this.handleClose}
          showInput={this.showInput}
          handleInputChange={this.handleInputChange}
          handleInputConfirm={this.handleInputConfirm}
          tags={this.state.tags}
          inputVisible={this.state.inputVisible}
          inputValue={this.state.inputValue}
          ref={this.saveInputRef}
        />
        */}

        {this.state.tags && <QuestionTagsAutocomplete tags={this.state.tags} handleTagChange={this.handleTagChange} />}

        <Button
          type="primary"
          className={classes['ask-question__btn']}
          onClick={() =>
            this.sendQuestion(
              this.state.title,
              convertToRaw(editorState.getCurrentContent()).blocks[0].text
                ? JSON.stringify(convertToRaw(editorState.getCurrentContent()))
                : '',
              this.state.selectedTags,
              1,
              1,
              this.state.editorUrl
            )
          }
        >
          {this.props.type === 'edit' ? 'Edit question' : 'Send question'}
        </Button>
      </div>
    )
  }
}

export default AskQuestion
