import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Select, Spin, message } from 'antd'
import { apiGet } from '../../api'

const Option = Select.Option

class QuestionTagsAutocomplete extends React.Component {
  static propTypes = {
    dataSource: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      })
    ),
  }
  state = {
    dataSource: [],
    selectedItems: [],
    fetching: false,
  }

  constructor(props) {
    super(props)
    this.debouncedGetTags = _.debounce(this.getTags, 200)
  }

  getTags = async q => {
    try {
      const res = await apiGet.getTags({ q })
      const dataSource = _.get(res, 'data.tags', null)
      if (!dataSource) throw new Error('Internal server error')
      this.setState({ fetching: false, dataSource })
    } catch (err) {
      // console.error('rr', err)
      message.error('Internal server error')
      this.setState({ fetching: false })
    }
  }
  handleChange = selectedItems => {
    this.setState({ selectedItems })
  }

  handleKeydown = e => {
    // console.log('[handleKeydown]', e.target.value)
    this.setState({ fetching: true })
    this.debouncedGetTags(e.target.value)
  }

  render() {
    const { selectedItems, fetching, dataSource } = this.state

    const filteredOptions = dataSource.filter(o => !selectedItems.includes(o.title))
    // console.log('datasrc', filteredOptions)
    return (
      <div>
        <Select
          {...this.props}
          mode="multiple"
          size="large"
          onInputKeyDown={this.handleKeydown}
          placeholder="Select tags"
          notFoundContent={fetching ? <Spin size="small" /> : null}
        >
          {filteredOptions.map(tag => {
            return (
              <Option key={tag.id} value={tag.id}>
                {tag.title}
              </Option>
            )
          })}
        </Select>
      </div>
    )
  }
}

export default QuestionTagsAutocomplete
