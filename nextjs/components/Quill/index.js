import React, { Component } from 'react'
// import ReactQuill from 'react-quill'

class Quill extends Component {
  state = {
    text: '',
  }
  handleChange(value) {
    this.setState({ text: value })
  }
  render() {
    return (
      <div>
        <div>Quill</div>
        {/* <ReactQuill value={this.state.text} onChange={this.handleChange} /> */}
      </div>
    )
  }
}

export default Quill
