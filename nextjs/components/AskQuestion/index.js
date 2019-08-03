import React, { Component } from 'react'
import Head from 'next/head'
import axios from 'axios'
import styled from 'styled-components'
import _ from 'lodash'
import stackBlitzSdk from '@stackblitz/sdk'
import { Input, Steps, Spin, Alert, Button, message } from 'antd'
import FormField from '../FormField'
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

    sandbox_id: null,

    // Form data
    titleValue: '',
    repositoryUrlValue: '',
    selectedTags: [], // Array of tag ids

    // Draftjs editor state
    editorState: EditorState.createEmpty(),

    // Set to true when this component mounts
    _mounted: false,
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

  handleTitleInputChange = e => {
    this.setState({ titleValue: e.target.value })
  }

  handleDescriptionInputChange = editorState => {
    this.setState({ editorState })
  }

  handleRepositoryUrlInputChange = e => {
    this.setState({ repositoryUrlValue: e.target.value })
  }

  handleTagsAutocompleteSelect = tagTitle => {
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

  createAndEmbedStackblitzProject = async chosenTemplate => {
    console.log('chosenTemplate', chosenTemplate)
    try {
      this.setState({ contentLoading: true })
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
          forceEmbedLayout: true,
        }
      )
      this.setState({ contentLoading: false, vmMounted: true })
    } catch (err) {
      console.error('[createAndEmbedStackblitzProject]', { err })
      this.setState({ contentLoading: false, vmMounted: false })
    }
  }

  setTemplate = chosenTemplate => {
    this.setState(
      {
        chosenTemplate,
        currentStep: chosenTemplate !== null ? 1 : 0,
        vmMounted: chosenTemplate !== null ? true : false,
      },
      () => {
        // if chosenTemplate === null it means we're letting user choose a different template
        if (chosenTemplate) this.createAndEmbedStackblitzProject(chosenTemplate)
      }
    )
  }

  next = async () => {
    this.setState({ contentLoading: true })
    // returns {[file_name]: fileContent }
    const files = await this._stackBlitzVm.getFsSnapshot()

    const sandboxFiles = Object.entries(files).reduce((acc, [fileName, fileContent]) => {
      return {
        ...acc,
        [fileName]: {
          content: fileContent,
        },
      }
    }, {})

    try {
      const res = await axios.post('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
        files: sandboxFiles,
      })
      const sandbox_id = _.get(res, 'data.sandbox_id', null)
      if (!sandbox_id) throw new Error('sandbox_id is falsy')
      console.log('[next]', { sandbox_id })
      this.setState({ sandbox_id, currentStep: 2, contentLoading: false })
    } catch (err) {
      console.error('[next]', err)
      this.setState({ contentLoading: false })
    }
  }

  render() {
    const { editorState, _mounted, contentLoading } = this.state

    return (
      <div>
        <Head>
          <title>Submit question</title>
        </Head>
        <StyledSteps current={this.state.currentStep}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </StyledSteps>{' '}
        <StepContentWrapper contentLoading={contentLoading}>
          {contentLoading && <Spin size="large" />}
          {!contentLoading && this.state.currentStep === 0 && (
            <React.Fragment>
              {!this.state.chosenTemplate && <TemplateList setTemplate={this.setTemplate} />}
            </React.Fragment>
          )}

          <SecondStepWrapper active={!contentLoading && this.state.currentStep === 1}>
            <Alert
              message="Please hit the save button (Cmd + S or Ctrl + S) when editor is focused before proceeding forward"
              type="info"
              showIcon
            />
            <Row>
              <Button onClick={this.setTemplate.bind(this, null)}>Choose a different template</Button>
              {this.state.vmMounted && (
                <Button type="primary" onClick={this.next}>
                  I'm done
                </Button>
              )}
            </Row>
            <IFrameWrapper>
              <div id="stackblitz-iframe" />
            </IFrameWrapper>
          </SecondStepWrapper>

          {!contentLoading && this.state.currentStep === 2 && (
            <Column>
              <FormField>
                <InputLabel text="Title" />
                <Input
                  placeholder="Question title"
                  size="large"
                  type="primary"
                  value={this.state.titleValue}
                  onChange={this.handleTitleInputChange}
                />
              </FormField>

              <FormField>
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
              </FormField>

              <FormField>
                <InputLabel text="Tags" />
                <QuestionTagsAutocomplete
                  dataSource={this.state.tagsAutocompleteDatasource}
                  onSelect={this.handleTagsAutocompleteSelect}
                  onDeselect={this.handleTagsAutocompleteDeselect}
                />
              </FormField>
              <Row>
                <Button
                  size="large"
                  onClick={() => {
                    this.setState({ currentStep: 1 })
                  }}
                >
                  Back
                </Button>

                <Button size="large" type="primary" onClick={this.handleSubmit}>
                  Submit
                </Button>
              </Row>
            </Column>
          )}
        </StepContentWrapper>
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

const SecondStepWrapper = styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
  width: 100%;
`

const StyledSteps = styled(Steps)`
  margin-bottom: 1rem;
`

const IFrameWrapper = styled.div`
  width: 100%;
  min-height: 90vh;
  padding: 15px 0;
  #stackblitz-iframe {
    border: none;
    border-radius: 4px;
    min-height: 90vh;
  }
`

const StepContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => (!props.contentLoading ? 'flex-start' : 'center')};
  width: 100%;
`
const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 0.5rem;
  padding: 8px 0;
`

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  padding: 8px 0;
`

export default AskQuestion
