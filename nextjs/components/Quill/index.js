import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Quill extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    if (typeof document !== 'undefined') {
      this.quill = require('react-quill')
    }
  }

  render() {
    const Quill = this.quill
    if (Quill) {
      return <Quill onChange={this.props.onChange} style={{ background: 'white', ...this.props.style }} />
    } else {
      return null
    }
  }
}

export default Quill
