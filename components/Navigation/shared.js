import React, { Children } from 'react'
import { withRouter } from 'next/router'
import { Button } from 'antd'
import Link from 'next/link'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`

const AnchorText = styled.span`
  color: ${props => props.color || 'black'};
  ${props =>
    props.isActive &&
    css`
      color: ${props.theme.antBlue}!important;
    `}

  &:hover {
    color: ${props => props.theme.antBlue};
  }
  text-transform: uppercase;
  font-weight: 500;
`

export const Anchor = React.forwardRef(({ children, color, isActive, href, className, ...rest }, ref) => {
  // Calling forwardRef separates a ref prop from actual component props
  const anchorTextProps = {}
  if (className !== undefined) anchorTextProps.className = className
  return (
    <a href={href} {...rest}>
      <AnchorText color={color} isActive={isActive} {...anchorTextProps}>
        {children}
      </AnchorText>
    </a>
  )
})

export const ListItem = styled.li`
  display: block;
  padding: 0 1rem;
  font-size: 0.75rem;
  vertical-align: middle;
  text-transform: uppercase;
  @media screen and (max-width: 745px) {
    padding: 0;
    margin-left: 16px;
  }
  &:last-of-type {
    padding-right: 0;
  }
`

export const StatefulLink = withRouter(({ router, children, as, href, color, textStyle, ...rest }) => {
  return (
    <Link {...rest} href={href} as={as}>
      <a>
        <AnchorText isActive={router.asPath === href || router.asPath === as} color={color} style={textStyle}>
          {children}
        </AnchorText>
      </a>
    </Link>
  )
})

export const ButtonLink = withRouter(({ router, children, as, href, color, buttonType, style, ...rest }) => {
  const buttonProps = {}
  if (buttonType !== undefined) buttonProps.type = buttonType
  return (
    <Link {...rest} href={href} as={as}>
      <a>
        <Button {...buttonProps} style={style}>
          {children}
        </Button>
      </a>
    </Link>
  )
})
