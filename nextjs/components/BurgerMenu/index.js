import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BurgerMenu = ({ onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <Line />
      <Line />
      <Line />
    </Wrapper>
  )
}

BurgerMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
}

const Wrapper = styled.div`
  display: none;
  @media screen and (max-width: 745px) {
    display: block;
    margin-left: auto;
    cursor: pointer;
  }
`
const Line = styled.div`
  width: 35px;
  height: 5px;
  background-color: black;
  margin: 6px 0;
`

export default BurgerMenu
