import React from 'react'
import axios from 'axios'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { Spin, Alert, Button, message } from 'antd'
import stackBlitzSdk from '@stackblitz/sdk'
import Quill from '../Quill'
import { apiPost } from '../../api'

class AddAnswer extends React.Component {
  _stackBlitzVm = null

  state = {
    contentLoading: true,
    vmMounted: false,
    sandboxID: null,

    // Data
    description: '',
  }

  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      reputation: PropTypes.number.isRequired,
      avatar: PropTypes.string,
      full_name: PropTypes.string,
    }),
    question: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      repository_url: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      comments: PropTypes.array.isRequired,
      tags: PropTypes.array.isRequired,
      author: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
      }),
      fs: PropTypes.object.isRequired,
      dependencies: PropTypes.object.isRequired,
    }),
  }
  componentDidMount() {
    this.forkOriginalStackblitzProject()
  }

  forkOriginalStackblitzProject = async () => {
    let project = {
      files: this.props.question.fs,
      dependencies: this.props.question.dependencies,
      title: this.props.question.title,
      description: this.props.question.title,
      template: this.props.question.stackblitz_template,
    }
    console.log('[forkOriginalStackblitzProject]', { project })
    try {
      this._stackBlitzVm = await stackBlitzSdk.embedProject('stackblitz-iframe', project, {
        view: 'both',
      })
      this.setState({ contentLoading: false, vmMounted: true })
    } catch (err) {
      console.error('[createAndEmbedStackblitzProject]', { err })
      this.setState({ contentLoading: false, vmMounted: false })
    }
  }

  handleDescriptionChange = description => {
    console.log('[handleDescriptionChange]', { description })
    this.setState({ description })
  }

  postAnswer = async () => {
    try {
      this.setState({ contentLoading: true, vmMounted: false })

      const files = await this._stackBlitzVm.getFsSnapshot()
      console.log('WHAT ARE THOOOOOSE??', { files })
      return
      const dependencies = await this._stackBlitzVm.getDependencies()
      console.log('[next]', { dependencies })

      const sandboxFiles = Object.entries(files).reduce((acc, [fileName, fileContent]) => {
        return {
          ...acc,
          [fileName]: {
            content: fileContent,
          },
        }
      }, {})

      const res = await axios.post('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
        files: sandboxFiles,
      })
      const sandboxID = _.get(res, 'data.sandbox_id', null)
      if (!sandboxID) throw new Error('sandbox_id is null or undefined')

      const res2 = await apiPost.sendAnswer({
        authorId: this.props.user.id,
        questionId: this.props.question.id,
        title: this.props.question.title,
        description: this.props.question.description,
        stackBlitzTemplate: this.props.question.stackblitz_template,
        fs: files,
        dependencies: dependencies,
        editor: 1,
        repoUrl: `https://codesandbox.io/embed/${sandboxID}`,
      })
      message.success('Answer successfully submitted!')
      Router.push(`/question/${this.props.question.id}/${this.props.question.slug}`)

      console.log('[postAnswer]', res2.data)
    } catch (err) {
      console.error('[postAnswer]', { err })
    }
  }

  render() {
    console.log('[render]', this.props)
    return (
      <div>
        {this.state.contentLoading && (
          <SpinWrapper>
            <Spin size="large" />
          </SpinWrapper>
        )}

        <IFrameWrapper isVmMounted={this.state.vmMounted}>
          <h3
            css={`
              display: ${this.state.vmMounted ? 'block' : 'none'};
            `}
          >
            1. Code
          </h3>
          <Alert
            message="Please hit the save button (Cmd + S or Ctrl + S) when editor is focused before proceeding forward"
            type="info"
            showIcon
            css={`
              display: ${this.state.vmMounted ? 'block' : 'none'};
              margin-bottom: 8px;
            `}
          />

          <div id="stackblitz-iframe" />
        </IFrameWrapper>

        <StepsWrapper active={!this.state.contentLoading}>
          <h3>2. Explanation</h3>
          {!this.state.contentLoading && (
            <Quill style={{ height: '200px' }} value={this.state.description} onChange={this.handleDescriptionChange} />
          )}
          {this.state.vmMounted && (
            <Button type="primary" size="large" onClick={this.postAnswer} style={{ marginTop: '50px' }}>
              Submit
            </Button>
          )}
        </StepsWrapper>
      </div>
    )
  }
}

// Margin-bottom 15px instead of 16px because we can't get iframe inside iframewrapper to be 100% height
const IFrameWrapper = styled.div`
  width: ${props => (props.isVmMounted ? '100%' : 0)};
  min-height: ${props => (props.isVmMounted ? '90vh' : 0)};
  margin-bottom: 15px;
  ${props =>
    !props.isVmMounted &&
    css`
      height: 0;
    `}
  #stackblitz-iframe {
    border: none;
    border-radius: 4px;
    min-height: 90vh;
  }
`

const StepsWrapper = styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
  width: 100%;
`

const SpinWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

export default AddAnswer
