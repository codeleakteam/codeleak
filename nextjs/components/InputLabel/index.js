import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InputLabel = ({ text }) => <Label>{text}</Label>

InputLabel.propTypes = {
  text: PropTypes.string.isRequired,
}

const Label = styled.span`
  font-size: 1rem;
  font-weight: 800;
  color: black;
`

export default InputLabel
