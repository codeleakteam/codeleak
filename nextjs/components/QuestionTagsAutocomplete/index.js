import React from 'react'
import { Select } from 'antd'

const Option = Select.Option

const QuestionTagsAutocomplete = ({ tags, handleTagChange }) => {
  return (
    <div>
      <Select mode="multiple" onChange={handleTagChange} style={{ width: '100%' }} placeholder="Select tags">
        {tags.map(tag => {
          return (
            <Option key={tag.id} value={tag.title}>
              {tag.title}
            </Option>
          )
        })}
      </Select>
    </div>
  )
}

export default QuestionTagsAutocomplete
