import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

const Option = Select.Option

class QuestionTagsAutocomplete extends React.Component {
  render() {
    const { dataSource, onInputKeyDown, onSelect, onDeselect } = this.props
    return (
      <div>
        <Select
          mode="tags"
          onInputKeyDown={onInputKeyDown}
          onSelect={onSelect}
          onDeselect={onDeselect}
          style={{ width: '100%' }}
          placeholder="Select tags"
        >
          {dataSource.map(tag => {
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
}

QuestionTagsAutocomplete.propTypes = {
  onInputKeyDown: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
}

export default QuestionTagsAutocomplete
