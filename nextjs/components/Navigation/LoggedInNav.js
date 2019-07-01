import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import BurgerMenu from '../BurgerMenu'
import Link from 'next/link'
import { Wrapper, Anchor, ListItem } from './shared'
import Search from '../Search'

const links = [
  {
    name: 'Jobs',
    href: '/',
  },
  {
    name: 'Tags',
    href: '/taglist',
  },
]

const LoggedInNav = ({ isMenuActive, handleBurgerMenu, isResponsive, showBurger }) => {
  return (
    <React.Fragment>
      <Wrapper isResponsive={isResponsive}>
        <Search isResponsive={isResponsive} />
        <List>
          {links.map(l => {
            return (
              <ListItem key={l.name}>
                <Link href={l.href}>
                  {isResponsive ? <Anchor onClick={handleBurgerMenu}>{l.name}</Anchor> : <Anchor>{l.name}</Anchor>}
                </Link>
              </ListItem>
            )
          })}
          <ListItem>
            <Link href="/profile">
              <UserAvatar />
            </Link>
          </ListItem>
        </List>
      </Wrapper>
      {showBurger && <BurgerMenu isMenuActive={isMenuActive} onClick={handleBurgerMenu} />}
    </React.Fragment>
  )
}

const List = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  @media screen and (max-width: 745px) {
    display: flex;
    flex-direction: column;
    margin-left: 0;
    padding-left: 0;
  }
`

const UserAvatar = styled.div`
  border-radius: 50%;
  background-color: $dirtyWhite;
  width: 40px;
  height: 40px;
  cursor: pointer;
`

LoggedInNav.propTypes = {
  isMenuActive: PropTypes.bool.isRequired,
  handleBurgerMenu: PropTypes.func.isRequired,
  showBurger: PropTypes.bool.isRequired,
  isResponsive: PropTypes.bool.isRequired,
}

export default LoggedInNav
