import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SideMenu = ({ isMenuActive, children }) => {
  return <Wrapper isMenuActive={isMenuActive}>{children}</Wrapper>
}

const Wrapper = styled.div`
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 40%;
  min-width: 230px;
  left: 0;
  background: white;
  transition: all 300ms ease;
  transform: ${props => (props.isMenuActive ? 'translateX(0)' : 'translateX(-100%)')};
  border-right: 1px solid black;
  z-index: 10;
  @media screen and (max-width: 745px) {
    display: block;
  }
`
SideMenu.propTypes = {
  isMenuActive: PropTypes.bool.isRequired,
}

export default SideMenu
