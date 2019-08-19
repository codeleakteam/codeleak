import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Popover, Menu, Dropdown, Switch, Icon, Badge } from 'antd'
import styled, { css } from 'styled-components'
import moment from 'moment'
import Logo from '../Logo'
import Card from '../Card'
import { Wrapper, Anchor, ListItem } from './shared'
import Search from '../Search'
import { logout } from '../../helpers/functions/auth'
import { apiGet } from '../../api'
import CustomIcon from '../../assets/icons'
import { StatefulLink } from '../Navigation/shared'

class LoggedInNav extends React.Component {
  static propTypes = {
    isMenuActive: PropTypes.bool.isRequired,
    handleBurgerMenu: PropTypes.func.isRequired,
    showBurger: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string,
    }),
    authToken: PropTypes.string.isRequired,
  }

  state = {
    mobileSearchShown: false,
    contentLoading: true,
    notifications: null,
    unreadNotificationsCount: 0,
    hasSeenUnreadNotifications: false,
    err: null,
    user: this.props.user,
  }

  componentDidMount() {
    this.getNotifications()
    this.getUserProfile()
  }

  componentDidUpdate(prevProps, prevState) {
    const { hasSeenUnreadNotifications } = this.state

    if (prevState.hasSeenUnreadNotifications !== this.state.hasSeenUnreadNotifications && hasSeenUnreadNotifications) {
      this.markAllAsRead()
    }
  }

  getUserProfile = async () => {
    try {
      const res = await apiGet.getUserProfile({
        userID: this.state.user.id,
        token: this.props.authToken,
      })
      const user = _.get(res, 'data.user', null)
      if (!user) throw new Error('User null or undefined')
      this.setState({ user })
    } catch (err) {
      console.error('[getUserProfile]', { err })
      this.setState({ err: 'Internal server error' })
    }
  }

  getNotifications = async () => {
    try {
      this.setState({ contentLoading: true })
      const res = await apiGet.getNotifications({ userID: this.state.user.id, token: this.props.authToken })
      const notifications = _.get(res, 'data.notifications', null)
      if (!notifications) throw new Error('Notifications null or undefined')
      const unreadNotificationsCount = notifications.filter(n => n.unread).length
      this.setState({ notifications, contentLoading: false, unreadNotificationsCount })
    } catch (err) {
      console.error('[getNotifications]', { err })
      this.setState({ contentLoading: false, err: 'Internal server error' })
    }
  }

  markAllAsRead = async () => {
    try {
      this.setState({ contentLoading: true })
      const res = await apiGet.markAllAsRead({ userID: this.state.user.id, token: this.props.authToken })
      this.setState({ contentLoading: false, unreadNotificationsCount: 0 })
    } catch (err) {
      console.error('[markAllAsRead]', { err })
      this.setState({ contentLoading: false, err: 'Internal server error' })
    }
  }

  translateVerb = verb => {
    switch (verb) {
      case 'QUESTION_UPVOTE':
        return 'has upvoted your question!'
      case 'QUESTION_DOWNVOTE':
        return 'has downvoted your question!'
      case 'ANSWER_UPVOTE':
        return 'has upvoted your answer!'
      case 'ANSWER_DOWNVOTE':
        return 'has downvoted your answer!'
      case 'COMMENT_UPVOTE':
        return 'has upvoted your comment!'
      case 'COMMENT_DOWNVOTE':
        return 'has upvoted your comment!'
      case 'ADD_ANSWER':
        return 'answered your question!'
      case 'ADD_COMMENT':
        return 'commented on your question!'
      default:
        return 'DEFAULT'
    }
  }

  getAvatarIcon = verb => {
    switch (verb) {
      case 'QUESTION_UPVOTE':
        return <UpvoteIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png" />
      case 'QUESTION_DOWNVOTE':
        return <DownvoteIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png" />
      case 'ANSWER_UPVOTE':
        return <UpvoteIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png" />
      case 'ANSWER_DOWNVOTE':
        return <DownvoteIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png" />
      case 'COMMENT_UPVOTE':
        return <UpvoteIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png" />
      case 'COMMENT_DOWNVOTE':
        return <DownvoteIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png" />
      case 'ADD_ANSWER':
        return <AnswerCommentIcon name="comments" height="18px" />
      case 'ADD_COMMENT':
        return <AnswerCommentIcon name="comments" height="18px" />
      default:
        return 'DEFAULT'
    }
  }

  getAvatarLetter = user => {
    if (!!user.full_name) {
      return user.full_name.charAt(0)
    } else if (!!user.username) {
      return user.username.charAt(0).toUpperCase()
    } else return
  }

  renderNotifications = () => {
    return (
      <Menu style={{ width: '500px', background: '#eff1f4', padding: '8px' }}>
        {(this.state.notifications || []).map((n, i) => {
          if (i < 3) {
            return (
              <Menu.Item style={{ padding: '0', whiteSpace: 'normal' }} key="0">
                <StyledCard>
                  <RecipientAvatarWrapper>
                    {n.actor.avatar ? (
                      <StyledAvatar size="large" src={n.actor.avatar} />
                    ) : (
                      <Avatar
                        size={40}
                        style={{
                          verticalAlign: 'middle',
                          cursor: 'pointer',
                          color: '#f56a00',
                          backgroundColor: '#fde3cf',
                        }}
                      >
                        {getAvatarLetter(n.actor.username, n.actor.full_name)}
                      </Avatar>
                    )}
                    <RecipientAvatarIconWrapper>{this.getAvatarIcon(n.verb)}</RecipientAvatarIconWrapper>
                  </RecipientAvatarWrapper>

                  <div>
                    <NotificationTitle>
                      <NotificationActor>{n.actor.username}</NotificationActor>
                      &nbsp;
                      {this.translateVerb(n.verb)}
                    </NotificationTitle>
                    <TargetPostTitle>{n.target}</TargetPostTitle>
                    <p>{moment(n.timestamp).fromNow()}</p>
                  </div>
                </StyledCard>
              </Menu.Item>
            )
          } else {
            return null
          }
        })}
      </Menu>
    )
  }

  render() {
    const { handleBurgerMenu, showBurger } = this.props
    const { user } = this.state

    const menu = (
      <Menu style={{ width: '300px' }}>
        <Menu.Item key="0">
          <a href={`/profile/${this.props.user.id}/${this.props.user.username}`}>My profile</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="/">Settings</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
          Night mode
          <Switch style={{ marginLeft: '8px' }} size="small" />
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" onClick={() => logout()}>
          <a>Log out</a>
        </Menu.Item>
      </Menu>
    )

    let notificationsBellJSX

    if (!this.state.contentLoading && !this.state.err) {
      notificationsBellJSX = (
        <Badge count={this.state.unreadNotificationsCount}>
          <Icon style={{ cursor: 'pointer', fontSize: '1.2rem' }} type="bell" />
        </Badge>
      )
    }
    if (this.state.contentLoading) {
      notificationsBellJSX = (
        <Badge count={<Icon type="clock-circle" style={{ color: '#f5222d' }} />}>
          <Icon style={{ cursor: 'pointer', fontSize: '1.2rem' }} type="bell" />
        </Badge>
      )
    }

    if (this.state.err) {
      notificationsBellJSX = <Icon style={{ cursor: 'pointer', fontSize: '1rem' }} type="bell" />
    }

    return (
      <React.Fragment>
        <Wrapper>
          <List>
            {showBurger && (
              <ListItem
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
                    <Menu style={{ width: 256 }} mode="inline">
                      <Menu.Item key="1">
                        <StatefulLink href="/">
                          <Anchor>Questions</Anchor>
                        </StatefulLink>
                      </Menu.Item>
                      <Menu.Item key="2">
                        <StatefulLink href="/jobs">
                          <Anchor>Jobs</Anchor>
                        </StatefulLink>
                      </Menu.Item>
                      <Menu.Item key="3">
                        <StatefulLink href="/tags">
                          <Anchor>Tags</Anchor>
                        </StatefulLink>
                      </Menu.Item>
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
              </ListItem>
            )}

            <div
              css={`
                display: flex;
                @media screen and (max-width: 768px) {
                  width: ${this.state.mobileSearchShown ? '100%' : 'auto'};
                }
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
                    <ListItem key={l.name}>
                      <StatefulLink href={l.href}>
                        <Anchor onClick={handleBurgerMenu}>{l.name}</Anchor>
                      </StatefulLink>
                    </ListItem>
                  )
                })}
              </List>
            </div>

            <div>
              <ListItem
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
              </ListItem>

              <ListItem
                css={`
                  display: ${this.state.mobileSearchShown ? 'none' : 'inline-block'};
                  margin-bottom: -4px;
                `}
              >
                <Dropdown
                  placement="bottomRight"
                  overlay={this.renderNotifications()}
                  onVisibleChange={() => {
                    if (!this.state.hasSeenUnreadNotifications) {
                      this.setState({
                        hasSeenUnreadNotifications: true,
                      })
                    }
                  }}
                  trigger={!this.state.contentLoading ? ['click'] : []}
                >
                  {notificationsBellJSX}
                </Dropdown>
              </ListItem>

              <ListItem
                css={`
                  display: ${this.state.mobileSearchShown ? 'none' : 'inline-block'};
                `}
              >
                <Dropdown placement="bottomRight" overlay={menu} trigger={['click']}>
                  {user.avatar ? (
                    <StyledAvatar src={user.avatar} />
                  ) : (
                    <Avatar
                      style={{
                        verticalAlign: 'middle',
                        cursor: 'pointer',
                        color: '#f56a00',
                        backgroundColor: '#fde3cf',
                      }}
                    >
                      {this.getAvatarLetter(user)}
                    </Avatar>
                  )}
                </Dropdown>
              </ListItem>
            </div>
          </List>
        </Wrapper>
      </React.Fragment>
    )
  }
}

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

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
`

const regularPages = [
  {
    name: 'Questions',
    href: '/',
  },
  {
    name: 'Jobs',
    href: '/jobs',
  },
  {
    name: 'Tags',
    href: '/tags',
  },
  // {
  //   name: 'Blog',
  //   href: '/medium/blog',
  // },
]

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  padding: 0.7rem;
`

const NotificationTitle = styled.p`
  font-weight: 500;
`
const NotificationActor = styled.p`
  display: inline-block;
  color: black;
`
const RecipientAvatarWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  margin-right: 24px;
`

const RecipientAvatarIconWrapper = styled.div`
  position: absolute;
  bottom: -5px;
  right: -5px;
  height: 25px;
  width: 25px;
  background: white;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const UpvoteIcon = styled.img`
  width: 18px;
  height: 18px;
`
const StyledLogo = styled(Logo)`
  margin-right: 1rem;
`
const DownvoteIcon = styled(UpvoteIcon)`
  transform: rotate(180deg);
  margin-top: 4px;
`

const AnswerCommentIcon = styled(CustomIcon)`
  margin-left: 2px;
`

const TargetPostTitle = styled.p`
  font-weight: 500;
  margin: 4px 0;
  color: black;
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

const getAvatarLetter = (username, full_name) => {
  if (!!full_name) {
    return full_name.charAt(0).toUpperCase()
  } else if (!!username) {
    return username.charAt(0).toUpperCase()
  } else return
}

export default LoggedInNav
