import React from 'react'
import PropTypes from 'prop-types'

import classes from './index.scss'

const Button = ({ text, onClick, modifier }) => {
  let externalClass = classes[modifier]
  return (
    <button className={[classes.button, externalClass].join(' ')} onClick={onClick}>
      {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  modifier: PropTypes.string,
}

export default Button
