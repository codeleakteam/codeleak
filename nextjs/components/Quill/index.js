import React, { Component } from 'react'
// import ReactQuill from 'react-quill'

class Quill extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }
    if (document) {
      this.quill = require('react-quill')
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ text: value })
  }
  render() {
    const Quill = this.quill
    if (Quill) {
      return (
        <Quill
          onChange={this.handleChange}
          value={this.state.text}
          style={{ height: 500, marginBottom: 40, background: 'white' }}
        />
      )
    } else {
      return null
    }
  }
}

export default Quill
