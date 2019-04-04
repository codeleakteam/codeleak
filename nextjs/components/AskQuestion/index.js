import React from 'react'
import { Input, Button } from 'antd'
import InputLabel from '../InputLabel'
import TechnologyStack from '../TechnologyStack'

const { TextArea } = Input

const AskQuestion = () => {
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
      <Button type="primary">Post question</Button>
    </div>
  )
}

export default AskQuestion
