import React from 'react'
import { Input, Button } from 'antd'
import InputLabel from '../InputLabel'
import TechnologyStack from '../TechnologyStack'

import classes from './index.scss'

const { TextArea } = Input

const AskQuestion = ({ type }) => {
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
      <Input placeholder="Enter tags" type="primary" />
      <Button type="primary" className={classes['ask-question__btn']}>
        {type === 'edit' ? 'Edit question' : 'Send question'}
      </Button>
    </div>
  )
}

export default AskQuestion
