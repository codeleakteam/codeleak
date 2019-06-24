import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Link from 'next/link'

export default function UserSignature({ id, username, reputation, postedAt }) {
  return (
    <Wrapper>
      <Link href={`/profile/${id}`} as={`/profile/${id}/${username}`}>
        <AuthorAvatar
          src="https://hashnode.imgix.net/res/hashnode/image/upload/v1559555582766/Bm5xyeBqE.jpeg?w=80&h=80&fit=crop&crop=faces&auto=format,enhance&q=60"
          alt={username}
        />
      </Link>
      <Column>
        <Row>
          <Link href={`/profile/${id}`} as={`/profile/${id}/${username}`}>
            <a>
              <AuthorUsername>{username}</AuthorUsername>
            </a>
          </Link>
          <DotSeparator />
          <PostTimestamp>{postedAt}</PostTimestamp>
        </Row>
        <Row>
          <ReputationIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-5-min.png" alt="reputation-icon" />
          <ReputationCounter>{reputation}</ReputationCounter>
        </Row>
      </Column>
    </Wrapper>
  )
}

UserSignature.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  postedAt: PropTypes.string.isRequired,
  reputation: PropTypes.number.isRequired,
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
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
  margin-right: 10px;
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
  color: #757575;
`

const PostTimestamp = styled.span`
  color: #757575;
`
