import React from 'react'
import Link from 'next/link'
import { Input } from 'antd'
import BurgerMenu from '../BurgerMenu'

import classes from './index.scss'

const LoggedOutNav = ({ responsive, burger, handleBurgerMenu, menuActive }) => {
  let responsiveMenu = responsive ? classes['navigation--responsive'] : classes.navigation
  return (
    <React.Fragment>
      <div className={responsiveMenu}>
        <Input placeholder="Search question" className={classes.navigation__search} />
        <ul className={classes['navigation__list--loggedOut']}>
          <li className={classes.navigation__listItem}>
            <Link href="/signin">
              <a className={classes.navigation__link}>Sign in</a>
            </Link>
          </li>
          <li className={classes.navigation__listItem}>
            <Link href="/signup">
              <a className={classes.navigation__link}>Register</a>
            </Link>
          </li>
        </ul>
      </div>
      {burger && <BurgerMenu menuActive={menuActive} handleBurgerMenu={handleBurgerMenu} />}
    </React.Fragment>
  )
}

export default LoggedOutNav
