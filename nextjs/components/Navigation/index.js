import React from 'react'
import Logo from '../Logo'
import PropTypes from 'prop-types'
import LoggedInNav from './LoggedInNav'
import LoggedOutNav from './LoggedOutNav'

import classes from './index.scss'

const Navigation = ({ menuActive, handleBurgerMenu, logo, burger, responsive, loggedIn }) => {
  let renderNav = loggedIn ? (
    <LoggedInNav menuActive={menuActive} handleBurgerMenu={handleBurgerMenu} responsive={responsive} burger={burger} />
  ) : (
    <LoggedOutNav responsive={responsive} menuActive={menuActive} handleBurgerMenu={handleBurgerMenu} burger={burger} />
  )
  return (
    <nav className={classes.navigation__container}>
      {logo && <Logo />}
      {renderNav}
    </nav>
  )
}

Navigation.propTypes = {
  menuActive: PropTypes.bool.isRequired,
  handleBurgerMenu: PropTypes.func.isRequired,
  logo: PropTypes.bool.isRequired,
  burger: PropTypes.bool.isRequired,
}

export default Navigation
