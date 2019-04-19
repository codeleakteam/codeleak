import React from 'react'
import PropTypes from 'prop-types'

import classes from './index.scss'

const BurgerMenu = ({ handleBurgerMenu }) => {
  return (
    <div className={classes.burger} onClick={handleBurgerMenu}>
      <div />
      <div />
      <div />
    </div>
  )
}

BurgerMenu.propTypes = {
  handleBurgerMenu: PropTypes.func.isRequired,
}

export default BurgerMenu
