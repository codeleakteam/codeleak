import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'

const Logo = ({ type, size, className }) => {
  const wrapperProps = {}
  const nonBlueTextStyle = {}

  if (className !== undefined) wrapperProps.className = className
  if (size !== undefined) nonBlueTextStyle.size = size

  const shortLogoJSX = <BlueText>&lt;/&gt;</BlueText>
  const fullLogoJSX = (
    <React.Fragment>
      <BlueText>c&lt;/&gt;de</BlueText>
      <span style={nonBlueTextStyle}>Leak</span>
    </React.Fragment>
  )
  return (
    <Link href="/">
      <Wrapper {...wrapperProps}>{type === 'short' ? shortLogoJSX : fullLogoJSX}</Wrapper>
    </Link>
  )
}

Logo.defaultProps = {
  type: 'full',
}

Logo.propTypes = {
  type: PropTypes.string,
}

const Wrapper = styled.div`
  font-size: 32px;
  color: black;
  font-weight: 500;
  cursor: pointer;
`
const BlueText = styled.span`
  color: ${props => props.theme.clBlue};
  transition: color 300ms ease;
  &:hover {
    color: rgba(62, 111, 181, 0.6);
  }
`

export default Logo
