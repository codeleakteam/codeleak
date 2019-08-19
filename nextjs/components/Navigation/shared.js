import React, { Children } from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`

export const Anchor = styled.a`
  color: ${props => (!props.isActive ? 'black' : props.theme.antBlue)};
  text-transform: uppercase;
  font-weight: 500;
`

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

export const StatefulLink = withRouter(({ router, children, as, href, ...rest }) => (
  <Link {...rest} href={href} as={as}>
    {React.cloneElement(Children.only(children), {
      isActive: router.asPath === href || router.asPath === as,
    })}
  </Link>
))
