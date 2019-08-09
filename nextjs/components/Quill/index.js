import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Quill extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    if (document) {
      this.quill = require('react-quill')
    }
  }

  render() {
    const Quill = this.quill
    if (Quill) {
      return (
        <Quill
          onChange={this.props.onChange}
          value={this.props.value}
          style={{ height: 500, marginBottom: 40, background: 'white' }}
        />
      )
    } else {
      return null
    }
  }
}

export default Quill
