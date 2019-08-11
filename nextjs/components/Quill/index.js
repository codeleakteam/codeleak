import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
      return (
        <Wrapper>
          <Quill onChange={this.props.onChange} style={{ ...this.props.style }} />
        </Wrapper>
      )
    } else {
      return null
    }
  }
}

const Wrapper = styled.div`
  .ql-toolbar.ql-snow {
    background: none;
    border: 1px solid #e0e0e0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .ql-container.ql-snow {
    border: 1px solid #e0e0e0;
    background: white;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`

export default Quill
