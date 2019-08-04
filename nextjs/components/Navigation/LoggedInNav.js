import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Menu, Dropdown, Switch, Icon, Badge } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import BurgerMenu from '../BurgerMenu'
import Card from '../Card'
import Link from 'next/link'
import { Wrapper, Anchor, ListItem } from './shared'
import Search from '../Search'
import { logout } from '../../helpers/functions/auth'
import { apiGet } from '../../api'
import CustomIcon from '../../assets/icons'

const regularPages = [
  {
    name: 'Jobs',
    href: '/',
  },
  {
    name: 'Tags',
    href: '/taglist',
  },
  {
    name: 'Blog',
    href: '/medium/blog',
  },
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

const DownvoteIcon = styled(UpvoteIcon)`
  transform: rotate(180deg);
`

const menu = (
  <Menu style={{ width: '300px' }}>
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
    <Menu.Item key="1" onClick={() => logout()}>
      <a>Log out</a>
    </Menu.Item>
  </Menu>
)

const AnswerCommentIcon = styled(CustomIcon)`
  margin-left: 2px;
`

const TargetPostTitle = styled.p`
  font-weight: 500;
  margin: 4px 0;
  color: black;
`

class LoggedInNav extends React.Component {
  state = {
    contentLoading: true,
    notifications: null,
    unreadNotificationsCount: 0,
    err: null,
  }

  componentDidMount() {
    this.getUnreadNotifications()
  }

  getUnreadNotifications = async () => {
    try {
      this.setState({ contentLoading: true })
      const res = await apiGet.getUnreadNotifications(this.props.userId)
      const notifications = _.get(res, 'data.notifications', null)
      this.setState({ notifications, contentLoading: false }, () => {
        console.log('[getUnreadNotifications] state changed', this.state)
      })
    } catch (err) {
      console.error('[getUnreadnotifictions]', { err })
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
        console.log('[translateVerb] DEFAULT', { verb })
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
        return 'kita'
    }
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
                    <StyledAvatar size="large" src={n.actor.avatar} />
                    <RecipientAvatarIconWrapper>{this.getAvatarIcon(n.verb)}</RecipientAvatarIconWrapper>
                  </RecipientAvatarWrapper>

                  <div>
                    <NotificationTitle>
                      <NotificationActor>{n.actor.full_name}</NotificationActor>
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
    const { isMenuActive, handleBurgerMenu, isResponsive, showBurger } = this.props

    let notificationsBellJSX

    if (!this.state.contentLoading && !this.state.err) {
      notificationsBellJSX = (
        <Badge count={this.state.notifications.length}>
          <Icon style={{ cursor: 'pointer', fontSize: '1rem' }} type="bell" />
        </Badge>
      )
    }
    if (this.state.contentLoading) {
      notificationsBellJSX = (
        <Badge count={<Icon type="clock-circle" style={{ color: '#f5222d' }} />}>
          <Icon style={{ cursor: 'pointer', fontSize: '1rem' }} type="bell" />
        </Badge>
      )
    }

    if (this.state.err) {
      notificationsBellJSX = <Icon style={{ cursor: 'pointer', fontSize: '1rem' }} type="bell" />
    }

    return (
      <React.Fragment>
        <Wrapper isResponsive={isResponsive}>
          <Search isResponsive={isResponsive} />
          <List>
            {regularPages.map(l => {
              return (
                <ListItem key={l.name}>
                  <Link href={l.href}>
                    {isResponsive ? <Anchor onClick={handleBurgerMenu}>{l.name}</Anchor> : <Anchor>{l.name}</Anchor>}
                  </Link>
                </ListItem>
              )
            })}
            <ListItem style={{ marginBottom: '-8px' }}>
              <Dropdown
                placement="bottomRight"
                overlay={this.renderNotifications()}
                trigger={!this.state.contentLoading ? ['click'] : []}
              >
                {notificationsBellJSX}
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
