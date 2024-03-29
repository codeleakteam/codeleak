import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import Logo from '../Logo'
import { Input, Button, Popover, Menu, Icon } from 'antd'
import { Wrapper, ListItem, Anchor, StatefulLink, ButtonLink } from './shared'
import Search from '../Search'

const { SubMenu } = Menu

class LoggedOutNav extends React.Component {
  state = {
    mobileSearchShown: false,
  }

  static propTypes = {
    isMenuActive: PropTypes.bool.isRequired,
    handleBurgerMenu: PropTypes.func.isRequired,
    showBurger: PropTypes.bool.isRequired,
  }

  render() {
    const { handleBurgerMenu, showBurger } = this.props
    return (
      <Wrapper>
        <List>
          {showBurger && (
            <StyledListItem
              css={`
                display: none;
                @media screen and (max-width: 768px) {
                  display: block;
                  margin: 0 16px 0 0;
                }
              `}
            >
              <Popover
                placement="bottomLeft"
                content={
                  <Menu onClick={this.handleClick} style={{ width: 256 }} mode="inline">
                    <Menu.Item key="1">
                      <StatefulLink href="/">Questions</StatefulLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <StatefulLink href="/jobs">Jobs</StatefulLink>
                    </Menu.Item>
                    {/*
                        <Menu.Item key="3">
                          <StatefulLink href="/tags">Tags</StatefulLink>
                        </Menu.Item>
                     */}
                    <Menu.Item key="4">
                      <Anchor href="mailto:hi@codeleak.io">Send us an email</Anchor>
                    </Menu.Item>
                    <Menu.Item key="5">
                      <Anchor href="https://www.patreon.com/codeleak" target="_blank">
                        Become a sponsor ❤️
                      </Anchor>
                    </Menu.Item>

                    <SubMenu
                      key="sub1"
                      title={
                        <Anchor
                          css={`
                            color: rgba(0, 0, 0, 0.65);
                          `}
                        >
                          Policies
                        </Anchor>
                      }
                    >
                      <Menu.Item key="6">
                        <StatefulLink href="/privacy">Privacy</StatefulLink>
                      </Menu.Item>
                      <Menu.Item key="7">
                        <StatefulLink href="/cookies">Cookie</StatefulLink>
                      </Menu.Item>
                      <Menu.Item key="8">
                        <StatefulLink href="/terms">Terms Of Use</StatefulLink>
                      </Menu.Item>
                    </SubMenu>
                  </Menu>
                }
                trigger="click"
              >
                <Icon
                  type="menu"
                  css={`
                    font-size: 1.2rem;
                    margin: 0;
                  `}
                />
              </Popover>
            </StyledListItem>
          )}

          <div
            css={`
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              @media screen and (max-width: 768px) {
                width: ${this.state.mobileSearchShown ? '100%' : 'auto'};
              }
            `}
          >
            <div
              css={`
                display: flex;
                width: ${this.state.mobileSearchShown ? '100%' : 'auto'};
              `}
            >
              <Logo
                css={`
                  font-size: 1.5rem;
                  margin-right: 16px;
                  @media screen and (max-width: 768px) {
                    display: none;
                  }
                `}
                type="short"
              />
              <StyledSearch shown={this.state.mobileSearchShown} />
              <List type="regularPages">
                {regularPages.map(l => {
                  return (
                    <StyledListItem key={l.name}>
                      <StatefulLink href={l.href}>{l.name}</StatefulLink>
                    </StyledListItem>
                  )
                })}
                <StyledListItem key={Math.random().toString()}>
                  <Anchor href="https://www.patreon.com/codeleak" target="_blank" color="black">
                    Become a sponsor
                  </Anchor>
                </StyledListItem>
              </List>
            </div>

            <div
              css={`
                display: flex;
                align-items: center;
              `}
            >
              <StyledListItem
                css={`
                  margin-bottom: -4px;
                  display: none;
                  @media screen and (max-width: 768px) {
                    display: inline-block;
                  }
                `}
                onClick={() =>
                  this.setState(prevState => ({ ...prevState, mobileSearchShown: !prevState.mobileSearchShown }))
                }
              >
                {!this.state.mobileSearchShown ? (
                  <Icon
                    type="search"
                    css={`
                      font-size: 1.2rem;
                    `}
                  />
                ) : (
                  <Icon
                    type="close"
                    css={`
                      font-size: 1.2rem;
                    `}
                  />
                )}
              </StyledListItem>
              {!this.state.mobileSearchShown && (
                <React.Fragment>
                  <StyledListItem
                    css={`
                      display: inline-block;
                    `}
                  >
                    <SignInButton href="/sign_in">Sign In</SignInButton>
                  </StyledListItem>

                  <StyledListItem
                    css={`
                      display: inline-block;
                    `}
                  >
                    <RegisterButton href="/sign_up">Register</RegisterButton>
                  </StyledListItem>
                </React.Fragment>
              )}
            </div>
          </div>
        </List>
      </Wrapper>
    )
  }
}

const regularPages = [
  {
    name: 'Questions',
    href: '/',
  },
  {
    name: 'Jobs',
    href: '/jobs',
  },
  // {
  //   name: 'Tags',
  //   href: '/tags',
  // },
  // {
  //   name: 'Blog',
  //   href: '/medium/blog',
  // },
]

const StyledListItem = styled(ListItem)``

const List = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  ${props =>
    props.type === 'regularPages' &&
    css`
      width: auto;
      @media screen and (max-width: 768px) {
        display: none;
      }
    `}
`

const StyledInput = styled(Input)`
  width: 364px;
  @media screen and (max-width: 364px) {
    width: 100%;
  }
`

const StyledSearch = styled(Search)`
  @media screen and (max-width: 768px) {
    display: none;
    ${props =>
      props.shown &&
      css`
        display: block;
      `}
  }
`

const SignInButton = ({ children, href }) => {
  const size = useWindowSize()
  return (
    <React.Fragment>
      {size.width < 768 ? (
        <ButtonLink href={href} as={href} color="white" style={{ textTransform: 'uppercase' }}>
          {children}
        </ButtonLink>
      ) : (
        <StatefulLink href={href}>{children}</StatefulLink>
      )}
    </React.Fragment>
  )
}

const RegisterButton = ({ children, href }) => {
  const size = useWindowSize()
  return (
    <React.Fragment>
      {size.width < 768 ? (
        <ButtonLink buttonType="primary" href={href} as={href} color="white" style={{ textTransform: 'uppercase' }}>
          {children}
        </ButtonLink>
      ) : (
        <ButtonLink href={href} as={href} color="white" style={{ textTransform: 'uppercase' }}>
          {children}
        </ButtonLink>
      )}
    </React.Fragment>
  )
}

function useWindowSize() {
  const isClient = typeof window === 'object'

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}

export default LoggedOutNav
