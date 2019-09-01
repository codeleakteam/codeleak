import React from 'react'
import { withRouter } from 'next/router'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import LoggedInNav from './LoggedInNav'
import LoggedOutNav from './LoggedOutNav'

const Navigation = withRouter(
  ({ router, user, isMenuActive, handleBurgerMenuClick, showLogo, showBurger, isLoggedIn, authToken }) => {
    const navJSX =
      isLoggedIn && authToken ? (
        <LoggedInNav
          isMenuActive={isMenuActive}
          handleBurgerMenu={handleBurgerMenuClick}
          authToken={authToken}
          showBurger={showBurger}
          user={user}
        />
      ) : (
        <LoggedOutNav isMenuActive={isMenuActive} handleBurgerMenu={handleBurgerMenuClick} showBurger={showBurger} />
      )
    return (
      <Wrapper
        css={`
          margin-bottom: ${router.asPath === '/' && !isLoggedIn ? '0' : '36px'};
        `}
      >
        <Container>{navJSX}</Container>
      </Wrapper>
    )
  }
)

const Wrapper = styled.nav`
  width: 100%;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 0.7rem 0;
`
const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1300px;
  width: 100%;
  padding: 0 8px;
  margin: 0 auto;
  z-index: 50;
`

Navigation.propTypes = {
  isMenuActive: PropTypes.bool.isRequired,
  handleBurgerMenuClick: PropTypes.func.isRequired,
  showLogo: PropTypes.bool.isRequired,
  showBurger: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }),
  isLoggedIn: PropTypes.bool.isRequired,
}

export default Navigation
