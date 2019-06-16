import React from 'react'
import styled from 'styled-components'
import Logo from '../Logo'
import PropTypes from 'prop-types'
import LoggedInNav from './LoggedInNav'
import LoggedOutNav from './LoggedOutNav'

const Navigation = ({ isMenuActive, handleBurgerMenuClick, showLogo, showBurger, isResponsive, isLoggedIn }) => {
  const navJSX = isLoggedIn ? (
    <LoggedInNav
      isMenuActive={isMenuActive}
      handleBurgerMenuClick={handleBurgerMenuClick}
      isResponsive={isResponsive}
      showBurger={showBurger}
    />
  ) : (
    <LoggedOutNav
      isResponsive={isResponsive}
      isMenuActive={isMenuActive}
      handleBurgerMenu={handleBurgerMenuClick}
      showBurger={showBurger}
    />
  )
  return (
    <Wrapper>
      {showLogo && <StyledLogo type="short" />}
      {navJSX}
    </Wrapper>
  )
}

const StyledLogo = styled(Logo)`
  margin-right: 5px;
`

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  z-index: 1;
  position: relative;
  margin-bottom: 36px;
  @media screen and(max-width:745px) {
    margin-top: 16px;
  }
`

Navigation.propTypes = {
  isMenuActive: PropTypes.bool.isRequired,
  handleBurgerMenuClick: PropTypes.func.isRequired,
  showLogo: PropTypes.bool.isRequired,
  showBurger: PropTypes.bool.isRequired,
  isResponsive: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}

export default Navigation
