import React from 'react'
import PropTypes from 'prop-types'

import classes from './index.scss'

const InputLabel = ({ text }) => <span className={classes.label}>{text}</span>

InputLabel.propTypes = {
  text: PropTypes.string.isRequired,
}

export default InputLabel
