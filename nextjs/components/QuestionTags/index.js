import React from 'react'
import { Icon, Tag, Input } from 'antd'

const QuestionTags = ({
  handleClose,
  showInput,
  handleInputChange,
  handleInputConfirm,
  tags,
  inputVisible,
  inputValue,
}) => {
  const forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault()
          handleClose(tag)
        }}
      >
        {tag}
      </Tag>
    )
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    )
  }

  // constsaveInputRef = input => (this.input = input)

  const tagChild = tags.map(forMap)

  return (
    <div>
      <div style={{ marginBottom: 16 }}>{tagChild}</div>
      {inputVisible && (
        <Input
          // ref={this.saveInputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
          <Icon type="plus" /> New Tag
        </Tag>
      )}
    </div>
  )
}

export default QuestionTags
