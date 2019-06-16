import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InputLabel = ({ text }) => <Label>{text}</Label>

InputLabel.propTypes = {
  text: PropTypes.string.isRequired,
}

const Label = styled.span`
  margin: 8px 0 4px;
  display: block;
  font-weight: 800;
  font-size: 16px;
  color: black;
`

export default InputLabel
