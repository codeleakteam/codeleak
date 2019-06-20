import React, { Component } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import _ from 'lodash'
import { Input, Button, message } from 'antd'
import InputLabel from '../InputLabel'
import TechnologyList from '../TechnologyList'
import { EditorState, RichUtils, convertToRaw } from 'draft-js'
// import addLinkPlugin from '../draftjs/addLinkPlugin'
import InlineStyleControls from '../draftjs/InlineStyleControls'
import DraftjsEditor from '../draftjs'
import UrlTab from '../draftjs/UrlTab'
import QuestionTagsAutocomplete from '../QuestionTagsAutocomplete'
import { apiGet, apiPost } from '../../api'
import Router from 'next/router'
// const { TextArea } = Input

class AskQuestion extends Component {
  state = {
    // Form data
    titleValue: '',
    repositoryUrlValue: '',
    selectedTags: [], // Array of tag ids

    // Autocomplete datasource
    tagsAutocompleteDatasource: [],

    // Draftjs editor state
    descriptionEditorState: EditorState.createEmpty(),

    // Set to true when this component mounts
    _mounted: false,
  }

  constructor(props) {
    super(props)
    this.debouncedGetTags = _.debounce(this.getTags, 200)
  }

  componentDidMount() {
    // DraftJS editor depends on this
    this.setState({ _mounted: true })
  }

  // draftjs handler
  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(this.state.descriptionEditorState, command)
    return true
  }

  // draftjs handler
  toggleInlineStyle = inlineStyle => {
    const descriptionEditorState = RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    this.setState({ descriptionEditorState })
  }

  getTags = async q => {
    try {
      const res = await apiGet.getTags({ q })
      const tagsAutocompleteDatasource = _.get(res, 'data.tags', null)
      if (!tagsAutocompleteDatasource) throw new Error('Internal server error')
      this.setState({ tagsAutocompleteDatasource })
    } catch (err) {
      message.error('Internal server error')
    }
  }

  handleTitleInputChange = e => {
    this.setState({ titleValue: e.target.value })
  }

  handleDescriptionInputChange = descriptionEditorState => {
    this.setState({ descriptionEditorState })
  }

  handleRepositoryUrlInputChange = e => {
    this.setState({ repositoryUrlValue: e.target.value })
  }

  handleTagsAutocompleteInputKeyDown = e => {
    this.debouncedGetTags(e.target.value)
  }

  handleTagsAutocompleteSelect = tagTitle => {
    const tag = this.state.tagsAutocompleteDatasource.filter(t => t.title === tagTitle)[0]
    if (!tag) return
    this.setState(
      prevState => ({
        ...prevState,
        selectedTags: [...prevState.selectedTags, tag.id],
      })
    )
  }

  handleTagsAutocompleteDeselect = tagTitle => {
    const tag = this.state.tagsAutocompleteDatasource.filter(t => t.title === tagTitle)[0]
    if (!tag) return
    const selectedTags = this.state.selectedTags.filter(tId => tId !== tag.id)
    this.setState({ selectedTags })
  }

  sendQuestion = async (title, description, tags, author, editor, repoUrl) => {
    try {
      const res = await apiPost.sendQuestion(title, description, tags, author, editor, repoUrl)
      const question = _.get(res, 'data.question', null)
      const questionId = _.get(res, 'data.question.id', null)
      const questionSlug = _.get(res, 'data.question.slug', null)
      if (!question) throw new Error('Internal server error')
      message.success('Successfully sent question!')
      Router.push(`/question/${questionId}/${questionSlug}`)
    } catch (error) {
      message.error('Internal server error')
    }
  }

  getDescription = () => {
    try {
      const description = JSON.stringify(convertToRaw(this.state.descriptionEditorState.getCurrentContent()))
      return description
    } catch (err) {
      console.error("[getDescription] Can't stringify editor state", err)
      return null
    }
  }
  handleSubmit = () => {
    this.sendQuestion(
      this.state.titleValue,
      this.getDescription(),
      this.state.selectedTags,
      1,
      1,
      this.state.repositoryUrlValue
    )
  }

  render() {
    const { descriptionEditorState, _mounted } = this.state

    return (
      <div>
        <Head>
          <title>Ask Question</title>
        </Head>
        <InputLabel text="Title" />
        <Input
          placeholder="Question title"
          type="primary"
          value={this.state.titleValue}
          onChange={this.handleTitleInputChange}
        />
        <InputLabel text="Description" />
        <React.Fragment>
          <InlineStyleControls editorState={descriptionEditorState} onToggle={this.toggleInlineStyle} />
          {_mounted && (
            <DraftjsEditor
              editorState={descriptionEditorState}
              handleKeyCommand={this.handleKeyCommand}
              plugins={this.plugins}
              placeholder="Describe your question here. Don't insert any code."
              onChange={this.handleDescriptionInputChange}
              height={300}
            />
          )}
        </React.Fragment>

        <InputLabel text="Technology stack" />
        <TechnologyList />

        <InputLabel text="CodeSandbox url" />
        <Input
          placeholder="Enter codeSandbox url"
          type="primary"
          value={this.state.repositoryUrlValue}
          onChange={this.handleRepositoryUrlInputChange}
        />

        <InputLabel text="Tags" />
        <QuestionTagsAutocomplete
          dataSource={this.state.tagsAutocompleteDatasource}
          onInputKeyDown={this.handleTagsAutocompleteInputKeyDown}
          onSelect={this.handleTagsAutocompleteSelect}
          onDeselect={this.handleTagsAutocompleteDeselect}
        />

        <StyledAskQuestionButton type="primary" onClick={this.handleSubmit}>
          {this.props.type === 'edit' ? 'Edit question' : 'Send question'}
        </StyledAskQuestionButton>
      </div>
    )
  }
}

const StyledAskQuestionButton = styled(Button)`
  margin-top: 16px;
`

export default AskQuestion
