import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import { Input } from 'antd'
import BurgerMenu from '../BurgerMenu'
import { Wrapper, ListItem, Anchor } from './shared'
import Search from '../Search'

const LoggedOutNav = ({ isMenuActive, handleBurgerMenu, isResponsive, showBurger }) => {
  return (
    <React.Fragment>
      <Wrapper isResponsive={isResponsive}>
        <Search isResponsive={isResponsive} />
        <List>
          <ListItem>
            <Link href="/signin">
              <Anchor>Sign in</Anchor>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/signup">
              <Anchor>Register</Anchor>
            </Link>
          </ListItem>
        </List>
      </Wrapper>
      {showBurger && <BurgerMenu isMenuActive={isMenuActive} onClick={handleBurgerMenu} />}
    </React.Fragment>
  )
}

const List = styled.ul`
  display: block;
  margin-left: auto;
  margin-bottom: 0;
  @media screen and (max-width: 745px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-left: 0;
    padding-left: 0;
  }
`

const StyledInput = styled(Input)`
  width: 364px;
  @media screen and (max-width: 364px) {
    width: 100%;
  }
`

LoggedOutNav.propTypes = {
  isMenuActive: PropTypes.bool.isRequired,
  handleBurgerMenu: PropTypes.func.isRequired,
  showBurger: PropTypes.bool.isRequired,
  isResponsive: PropTypes.bool.isRequired,
}

export default LoggedOutNav
