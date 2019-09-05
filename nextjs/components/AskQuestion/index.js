import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import styled, { css } from 'styled-components'
import _ from 'lodash'
import stackBlitzSdk from '@stackblitz/sdk'
import { Form, Input, Steps, Spin, Alert, Button, message } from 'antd'
import FormField from '../FormField'
import InputLabel from '../InputLabel'
import TemplateList from '../TemplateList'
import QuestionTagsAutocomplete from '../QuestionTagsAutocomplete'
import { apiPost } from '../../api'
import Router from 'next/router'
import Quill from '../Quill'

const { Step } = Steps

class AskQuestion extends Component {
  state = {
    currentStep: 2,

    contentLoading: false,
    chosenTemplate: null,
    sandboxID: null,

    // Data
    title: '',
    description: '',
    files: null,

    selectedTags: [], // Array of tag ids
  }

  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      reputation: PropTypes.number.isRequired,
      avatar: PropTypes.string,
      full_name: PropTypes.string,
    }),
    authToken: PropTypes.string.isRequired,
  }

  sendQuestion = async ({ title, description, tags }) => {
    try {
      const res = await apiPost.sendQuestion({
        author: this.props.user.id,
        title: this.state.title,
        description: this.state.description,
        tags: this.state.selectedTags,
        repoUrl: `https://codesandbox.io/embed/${this.state.sandboxID}`,
        editor: 1,
        stackBlitzTemplate: this.state.chosenTemplate.stackBlitzTemplate,
        fs: this.state.files,
        dependencies: this.state.dependencies,
        token: this.props.authToken,
      })
      const question = _.get(res, 'data.question', null)
      const questionId = _.get(res, 'data.question.id', null)
      const questionSlug = _.get(res, 'data.question.slug', null)
      if (!question) throw new Error('Internal server error')
      message.success('Question successfully submitted!')
      Router.push(`/question/${questionId}/${questionSlug}`)
    } catch (error) {
      console.error('[sendQuestion]', error)
      message.error('Internal server error')
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log('[handleSubmit]', { values })
      if (!err) {
        this.sendQuestion(values)
      }
    })
  }

  createAndEmbedStackblitzProject = async chosenTemplate => {
    let project = {
      files: chosenTemplate.fs,
      dependencies: chosenTemplate.dependencies,
      title: 'Dynamically Generated Project',
      description: 'Created with <3 by the StackBlitz',
      template: chosenTemplate.stackBlitzTemplate,
    }

    try {
      this.setState({ contentLoading: true })
      this._stackBlitzVm = await stackBlitzSdk.embedProject('stackblitz-iframe', project, {
        view: 'both',
      })
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
    const dependencies = await this._stackBlitzVm.getDependencies()
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
      const sandboxID = _.get(res, 'data.sandbox_id', null)
      if (!sandboxID) throw new Error('sandbox_id is null or undefined')

      // since we can't afford to re-render stackblitz editor we have keep it inside dom
      // IFrameWrapper depends on  isVmMounted prop to show/hide editor, but never remove it from the dom
      this.setState({ vmMounted: false, sandboxID, currentStep: 2, contentLoading: false, files, dependencies })
    } catch (err) {
      console.error('[next]', err)
      this.setState({ contentLoading: false })
    }
  }

  render() {
    const { editorState, _mounted, contentLoading } = this.state

    const { getFieldDecorator, setFieldsValue } = this.props.form
    return (
      <div>
        <StyledSteps current={this.state.currentStep}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </StyledSteps>{' '}
        {contentLoading && (
          <SpinWrapper>
            <Spin size="large" />,
          </SpinWrapper>
        )}
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
        </SecondStepWrapper>
        <IFrameWrapper isVmMounted={this.state.vmMounted}>
          <div id="stackblitz-iframe" />
        </IFrameWrapper>
        {!contentLoading && this.state.currentStep === 2 && (
          <Form onSubmit={this.onSubmit}>
            <FormField>
              <Form.Item label="Title">
                {getFieldDecorator('title', {
                  initialValue: this.state.title,
                  rules: [{ required: true, message: 'Question title is required!' }],
                })(<Input placeholder="Question title" size="large" type="primary" />)}
              </Form.Item>
            </FormField>

            <FormField css={``}>
              <Form.Item label="Description">
                {getFieldDecorator('description', {
                  initialValue: this.state.description,
                  rules: [{ required: true, message: 'Description is required!' }],
                })(<Quill height="500px" />)}
              </Form.Item>
            </FormField>

            <FormField>
              <Form.Item label="Tags">
                {getFieldDecorator('tags', {
                  initialValue: [],
                  rules: [{ required: true, message: 'Tags are required!' }],
                })(
                  <QuestionTagsAutocomplete
                    setFieldsValue={setFieldsValue}
                    dataSource={this.state.tagsAutocompleteDatasource}
                    css={`
                      width: 100%;
                    `}
                  />
                )}
              </Form.Item>
            </FormField>
            <Row>
              <Button
                size="large"
                onClick={() => {
                  this.setState({ currentStep: 1, vmMounted: true })
                }}
              >
                Back
              </Button>

              <Button size="large" type="primary" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Row>
          </Form>
        )}
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
  margin-bottom: 16px;
`

const IFrameWrapper = styled.div`
  width: ${props => (props.isVmMounted ? '100%' : 0)};
  min-height: ${props => (props.isVmMounted ? '90vh' : 0)};
  padding: 15px 0;
  ${props =>
    !props.isVmMounted &&
    css`
      height: 0;
      padding: 0;
    `}
  #stackblitz-iframe {
    border: none;
    border-radius: 4px;
    min-height: 90vh;
  }
`

const SpinWrapper = styled.div`
  display: flex;
  justify-content: center;
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

const AskQuestionWrapperComponent = Form.create({ name: 'ask_question' })(AskQuestion)
export default AskQuestionWrapperComponent
