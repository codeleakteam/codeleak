import React from 'react'

import './index.scss'

const SideMenu = props => {
    let activeClass = props.menuActive ? 'sidemenu__active' : ''
    return <div className={`sidemenu__container ${activeClass}`}>{props.children}</div>
}

export default SideMenu
