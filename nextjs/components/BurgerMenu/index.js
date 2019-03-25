import React from 'react'
import './index.scss'

const BurgerMenu = props => {
    return (
        <div className="burger" onClick={props.handleBurgerMenu}>
            <div />
            <div />
            <div />
        </div>
    )
}

export default BurgerMenu
