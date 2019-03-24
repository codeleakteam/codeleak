import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const Button = ({ color, text }) => {
    return <button className={`button button--${color}`}>{text}</button>
}

Button.propTypes = {
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}

export default Button
