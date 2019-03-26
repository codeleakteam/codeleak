import React from 'react'
import Link from 'next/link'
import BurgerMenu from '../BurgerMenu'
import Logo from '../Logo'
import PropTypes from 'prop-types'

import classes from './index.scss'

const Navigation = ({ menuActive, handleBurgerMenu, logo, burger, responsive }) => {
  let responsiveMenu = responsive ? classes['navigation__list--responsive'] : classes.navigation__list
  return (
    <nav className={classes.navigation}>
      {logo && <Logo />}
      <ul className={responsiveMenu}>
        <li className={classes.navigation__listItem}>
          <Link href="/">
            <a className={classes.navigation__link}>Blog</a>
          </Link>
        </li>
        <li className={classes.navigation__listItem}>
          <Link href="/">
            <a className={[classes.navigation__link, classes.navigation__linkActive].join(' ')}>Get early access</a>
          </Link>
        </li>
      </ul>
      {burger && <BurgerMenu menuActive={menuActive} handleBurgerMenu={handleBurgerMenu} />}
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
