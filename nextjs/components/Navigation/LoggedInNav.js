import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Input, Button } from 'antd'
import BurgerMenu from '../BurgerMenu'
import Link from 'next/link'
import { Wrapper, Anchor, ListItem } from './shared'

const LoggedInNav = ({ isMenuActive, handleBurgerMenuClick, isResponsive, showBurger }) => {
  return (
    <React.Fragment>
      <Wrapper isResponsive={isResponsive}>
        <StyledInput placeholder="Search questions" />
        <List>
          <ListItem>
            <Link href="/">
              <Anchor>Jobs</Anchor>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/">
              <Anchor>Tags</Anchor>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/profile">
              <UserAvatar />
            </Link>
          </ListItem>
        </List>
      </Wrapper>
      {showBurger && <BurgerMenu isMenuActive={isMenuActive} onClick={handleBurgerMenuClick} />}
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

const StyledInput = styled(Input)`
  width: 364px;
  @media screen and (max-width: 364px) {
    width: 100%;
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
  handleBurgerMenuClick: PropTypes.func.isRequired,
  showBurger: PropTypes.bool.isRequired,
  isResponsive: PropTypes.bool.isRequired,
}

export default LoggedInNav
