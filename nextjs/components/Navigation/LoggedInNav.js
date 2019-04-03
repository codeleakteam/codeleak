import React from 'react'
import { Input, Button } from 'antd'
import BurgerMenu from '../BurgerMenu'
import Link from 'next/link'

import classes from './index.scss'

const LoggedInNav = ({ menuActive, handleBurgerMenu, responsive, burger }) => {
  let responsiveMenu = responsive ? classes['navigation--responsive'] : classes.navigation
  return (
    <React.Fragment>
      <div className={responsiveMenu}>
        <Input placeholder="Search question" className={classes.navigation__search} />
        <ul className={classes.navigation__list}>
          <li className={classes.navigation__listItem}>
            <Link href="/">
              <Button type="primary">Ask question</Button>
            </Link>
          </li>
          <li className={classes.navigation__listItem}>
            <Link href="/">
              <a className={classes.navigation__link}>Jobs</a>
            </Link>
          </li>
          <li className={classes.navigation__listItem}>
            <Link href="/">
              <a className={classes.navigation__link}>Tags</a>
            </Link>
          </li>
          <li className={classes.navigation__listItem}>
            <Link href="/">
              <div className={classes.navigation__profile} />
            </Link>
          </li>
        </ul>
      </div>
      {burger && <BurgerMenu menuActive={menuActive} handleBurgerMenu={handleBurgerMenu} />}
    </React.Fragment>
  )
}

export default LoggedInNav
