import React from 'react'

import classes from './index.scss'

const SideMenu = props => {
  let activeClass = props.menuActive ? classes.active : ''
  return <div className={[classes.sidemenu__container, activeClass].join(' ')}>{props.children}</div>
}

export default SideMenu
