import React, { Component } from 'react'
import { Input, Button, Tag, Icon } from 'antd'
import InputLabel from '../InputLabel'
import TechnologyStack from '../TechnologyStack'
import QuestionTags from '../QuestionTags'

import classes from './index.scss'

const { TextArea } = Input

class AskQuestion extends Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
  }

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

  // ref used for focus
  saveInputRef = input => (this.input = input)

  render() {
    return (
      <div>
        <InputLabel text="Title" />
        <Input placeholder="Title" type="primary" />
        <InputLabel text="Description" />
        <TextArea rows={6} placeholder="Describe" />
        <InputLabel text="Technology stack" />
        <TechnologyStack />
        <InputLabel text="CodeSandbox url" />
        <Input placeholder="Enter codeSandbox url" type="primary" />
        <InputLabel text="Tags" />

        <QuestionTags
          handleClose={this.handleClose}
          showInput={this.showInput}
          handleInputChange={this.handleInputChange}
          handleInputConfirm={this.handleInputConfirm}
          tags={this.state.tags}
          inputVisible={this.state.inputVisible}
          inputValue={this.state.inputValue}
          ref={this.saveInputRef}
        />

        <Button type="primary" className={classes['ask-question__btn']}>
          {this.props.type === 'edit' ? 'Edit question' : 'Send question'}
        </Button>
      </div>
    )
  }
}

export default AskQuestion
