import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BurgerMenu = ({ onClick, isMenuActive }) => {
  return (
    <Wrapper onClick={onClick}>
      <Line visible={true} rotation={isMenuActive} />
      <Line visible={!isMenuActive} />
      <Line visible={true} rotation={isMenuActive} />
    </Wrapper>
  )
}

BurgerMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
}

const Wrapper = styled.div`
  display: none;

  @media screen and (max-width: 745px) {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    cursor: pointer;
  }
`

const Line = styled.div`
  width: 35px;
  height: 3px;
  background-color: #333;
  transition: 0.4s;
  opacity: ${props => (props.visible ? '1' : '0')};
  &:last-of-type {
    margin-bottom: 0;
  }
  &:nth-child(1) {
    transform: ${props => (props.rotation ? 'rotate(-45deg) translate(-8px, 6px);' : 'rotate(0)')};
  }
  &:nth-child(3) {
    transform: ${props => (props.rotation ? 'rotate(45deg) translate(-9px, -8px)' : 'rotate(0)')};
  }
`

export default BurgerMenu
