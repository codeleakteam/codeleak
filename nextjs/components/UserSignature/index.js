import React from 'react'
import { Avatar } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import PropTypes from 'prop-types'
import Link from 'next/link'

export default function UserSignature({ id, username, full_name, reputation, postedAt, avatar, ...rest }) {
  return (
    <Wrapper {...rest}>
      <Link href={`/profile/${id}`} as={`/profile/${id}/${username}`}>
        {avatar ? (
          <AuthorAvatar src={avatar} alt={username} />
        ) : (
          <Avatar
            size={40}
            style={{
              marginRight: '16px',
              verticalAlign: 'middle',
              cursor: 'pointer',
              color: '#f56a00',
              backgroundColor: '#fde3cf',
            }}
          >
            {getAvatarLetter(username, full_name)}
          </Avatar>
        )}
      </Link>
      <Column>
        <Row>
          <Link href={`/profile/${id}`} as={`/profile/${id}/${username}`}>
            <a>
              <AuthorUsername>{username}</AuthorUsername>
            </a>
          </Link>
          {postedAt && (
            <>
              <DotSeparator />
              <PostTimestamp>{moment(postedAt).fromNow()}</PostTimestamp>
            </>
          )}
        </Row>
        <Row>
          <ReputationIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-5-min.png" alt="reputation-icon" />
          <ReputationCounter>{reputation}</ReputationCounter>
        </Row>
      </Column>
    </Wrapper>
  )
}

export function MostHelpfulUserSignature({ id, username, full_name, reputation, postedAt, avatar, ...rest }) {
  return (
    <Wrapper {...rest}>
      <Link href={`/profile/${id}`} as={`/profile/${id}/${username}`}>
        {avatar ? (
          <AuthorAvatar src={avatar} alt={username} />
        ) : (
          <Avatar
            size={40}
            style={{
              marginRight: '16px',
              verticalAlign: 'middle',
              cursor: 'pointer',
              color: '#f56a00',
              backgroundColor: '#fde3cf',
            }}
          >
            {getAvatarLetter(username, full_name)}
          </Avatar>
        )}
      </Link>
      <Column>
        <Row>
          <Link href={`/profile/${id}`} as={`/profile/${id}/${username}`}>
            <a>
              <AuthorUsername
                css={`
                  font-size: 0.9rem;
                `}
              >
                {full_name ? full_name : username}
              </AuthorUsername>
            </a>
          </Link>
        </Row>
        <Row>
          <ReputationIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-17-min.png" alt="reputation-icon" />
          <ReputationCounter color="blue">{reputation}</ReputationCounter>
        </Row>
      </Column>
    </Wrapper>
  )
}

const getAvatarLetter = (username, full_name) => {
  if (!!full_name) {
    return full_name.charAt(0).toUpperCase()
  } else if (!!username) {
    return username.charAt(0).toUpperCase()
  } else return
}

UserSignature.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  postedAt: PropTypes.string,
  reputation: PropTypes.number.isRequired,
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
`

const AuthorAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-right: 16px;
  cursor: pointer;
  object-fit: cover;
`

const AuthorUsername = styled.span`
  font-weight: bold;
  color: #000;
  margin-right: 6px;
`

const DotSeparator = styled.div`
  margin-right: 6px;
  background: #000;
  width: 3px;
  height: 3px;
  border-radius: 50%;
`
const ReputationIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 6px;
`

const ReputationCounter = styled.span`
  color: ${props => (props.color === 'blue' ? props.theme.antBlue : '#757575')};
  font-weight: bold;
`

const PostTimestamp = styled.span`
  color: #757575;
`
