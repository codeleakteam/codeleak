import React, { Component } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import _ from 'lodash'
import stackBlitzSdk from '@stackblitz/sdk'
import { Input, Steps, Alert, Button, message } from 'antd'
import InputLabel from '../InputLabel'
import TemplateList from '../TemplateList'
import { EditorState, RichUtils, convertToRaw } from 'draft-js'
// import addLinkPlugin from '../draftjs/addLinkPlugin'
import InlineStyleControls from '../draftjs/InlineStyleControls'
import DraftjsEditor from '../draftjs'
import QuestionTagsAutocomplete from '../QuestionTagsAutocomplete'
import { apiGet, apiPost } from '../../api'
import Router from 'next/router'
// const { TextArea } = Input

const { Step } = Steps

class AskQuestion extends Component {
  state = {
    currentStep: 0,

    contentLoading: false,
    chosenTemplate: null,

    repositoryHasBeenSaved: false,

    // Form data
    titleValue: '',
    repositoryUrlValue: '',
    selectedTags: [], // Array of tag ids

    // Autocomplete datasource
    tagsAutocompleteDatasource: [],

    // Draftjs editor state
    editorState: EditorState.createEmpty(),

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
    const editorState = RichUtils.handleKeyCommand(this.state.editorState, command)
    this.setState({ editorState })
    return true
  }

  // draftjs handler
  toggleInlineStyle = inlineStyle => {
    const editorState = RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    this.setState({ editorState })
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

  handleDescriptionInputChange = editorState => {
    this.setState({ editorState })
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
    this.setState(prevState => ({
      ...prevState,
      selectedTags: [...prevState.selectedTags, tag.id],
    }))
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
      const description = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
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
      3,
      1,
      this.state.repositoryUrlValue
    )
  }

  onChange = currentStep => {
    console.log('onChange:', currentStep)
    this.setState({ currentStep })
  }

  createAndEmbedStackblitzProject = async chosenTemplate => {
    console.log('chosenTemplate', chosenTemplate)
    this._stackBlitzVm = await stackBlitzSdk.embedProject(
      'stackblitz-iframe',
      {
        files: chosenTemplate.fs,
        dependencies: chosenTemplate.dependencies,
        title: 'Dynamically Generated Project',
        description: 'Created with <3 by the StackBlitz',
        template: chosenTemplate.stackBlitzTemplate,
      },
      {
        height: 320,
      }
    )
  }

  setTemplate = chosenTemplate => {
    this.setState({ chosenTemplate, currentStep: chosenTemplate !== null ? 1 : 0 }, () => {
      console.log('[setTemplate]', { chosenTemplate })
      if (chosenTemplate) this.createAndEmbedStackblitzProject(chosenTemplate)
    })
  }

  proceed = () => {
    const project = {
      files: {
        'index.ts': code,
        'index.html': html,
      },
      title: 'Dynamically Generated Project',
      description: 'Created with <3 by the StackBlitz SDK!',
      dependencies: {
        moment: '*', // * = latest version
      },
    }
  }

  render() {
    const { editorState, _mounted } = this.state

    return (
      <div>
        <Head>
          <title>Submit question</title>
        </Head>
        <Steps current={this.state.currentStep}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>{' '}
        <StepContentWrapper>
          {this.state.currentStep === 0 && (
            <React.Fragment>
              {!this.state.chosenTemplate && <TemplateList setTemplate={this.setTemplate} />}
            </React.Fragment>
          )}
          {this.state.currentStep === 1 && this.state.chosenTemplate && (
            <React.Fragment>
              <Alert
                message="Please hit the save button (File -> Save) inside editor or press Ctrl + S when editor is focused before proceeding forward"
                type="info"
                showIcon
              />
              <Row>
                <StyledCodeCTAButton onClick={this.setTemplate.bind(this, null)}>
                  Choose a different template
                </StyledCodeCTAButton>
                <StyledCodeCTAButton type="primary" onClick={this.proceed}>
                  I'm done
                </StyledCodeCTAButton>
              </Row>
              <IFrameWrapper>
                <div id="stackblitz-iframe" />
              </IFrameWrapper>
              >
            </React.Fragment>
          )}
        </StepContentWrapper>
        {/* <InputLabel text="Title" />
        <Input
          placeholder="Question title"
          type="primary"
          value={this.state.titleValue}
          onChange={this.handleTitleInputChange}
        />
        <InputLabel text="Description" />
        <React.Fragment>
          <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} />
          {_mounted && (
            <DraftjsEditor
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              plugins={this.plugins}
              placeholder="Describe your question here. Don't insert any code."
              onChange={this.handleDescriptionInputChange}
              height={300}
            />
          )}
        </React.Fragment>

        <InputLabel text="Technology stack" />

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
        </StyledAskQuestionButton> */}
      </div>
    )
  }
}

const steps = [
  {
    title: 'Choose a template',
  },
  {
    title: 'Code',
  },
  {
    title: 'Details',
  },
]
const StyledAskQuestionButton = styled(Button)`
  margin-top: 16px;
`

const IFrameWrapper = styled.div`
  width: 100%;
  min-height: 90vh;
  padding: 15px 0;
  #stackblitz-iframe {
    min-height: 90vh;
  }
`

const StyledCodeCTAButton = styled(Button)`
  flex: 1;
  margin: 0 5px;
`

const StepContentWrapper = styled.div`
  padding: 20px 0;
`
const Row = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  padding: 8px 0;
  margin: 0 -5px;
`

export default AskQuestion
