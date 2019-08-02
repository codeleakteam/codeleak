import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Menu, Dropdown, Switch, Icon, Badge } from 'antd'
import styled, { css } from 'styled-components'
import BurgerMenu from '../BurgerMenu'
import Link from 'next/link'
import { Wrapper, Anchor, ListItem } from './shared'
import Search from '../Search'

const links = [
  {
    name: 'Jobs',
    href: '/',
    productionReady: false,
  },
  {
    name: 'Tags',
    href: '/taglist',
    productionReady: false,
  },
  {
    name: 'Blog',
    href: '/medium/blog',
    productionReady: true,
  },
]

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">My profile</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">Settings</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
      Night mode
      <Switch style={{ marginLeft: '8px' }} size="small" />
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">Log out</a>
    </Menu.Item>
  </Menu>
)

const LoggedInNav = ({ isMenuActive, handleBurgerMenu, isResponsive, showBurger }) => {
  return (
    <React.Fragment>
      <Wrapper isResponsive={isResponsive}>
        <Search isResponsive={isResponsive} />
        <List>
          {links.map(l => {
            return (
              <ListItem key={l.name}>
                <Link href={l.href}>
                  {isResponsive ? <Anchor onClick={handleBurgerMenu}>{l.name}</Anchor> : <Anchor>{l.name}</Anchor>}
                </Link>
              </ListItem>
            )
          })}
          <ListItem style={{ marginBottom: '-8px' }}>
            <Dropdown placement="bottomCenter" overlay={menu} trigger={['click']}>
              <Badge count={5}>
                <Icon style={{ cursor: 'pointer', fontSize: '1rem' }} type="bell" />
              </Badge>
            </Dropdown>
          </ListItem>
          <ListItem>
            <Dropdown placement="bottomRight" overlay={menu} trigger={['click']}>
              <Avatar style={{ cursor: 'pointer', color: '#f56a00', backgroundColor: '#fde3cf' }}>BZ</Avatar>
              {/* <StyledAvatar src="https://sfo2.digitaloceanspaces.com/codeleak/media/public/prop2_r4vAD1s.jpeg" /> */}
            </Dropdown>
          </ListItem>
        </List>
      </Wrapper>
      {showBurger && <BurgerMenu isMenuActive={isMenuActive} onClick={handleBurgerMenu} />}
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

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
`

LoggedInNav.propTypes = {
  isMenuActive: PropTypes.bool.isRequired,
  handleBurgerMenu: PropTypes.func.isRequired,
  showBurger: PropTypes.bool.isRequired,
  isResponsive: PropTypes.bool.isRequired,
}

export default LoggedInNav
