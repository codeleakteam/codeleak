import React, { Component, memo } from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import Link from 'next/link'
import Card from '../Card'
import TagWithLink from '../TagWithLink'
import Icon from '../../assets/icons'

class QuestionSummary extends Component {
  static propTypes = {
    authorId: PropTypes.number.isRequired,
    authorUsername: PropTypes.string.isRequired,
    authorFullName: PropTypes.string,
    questionId: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    answers: PropTypes.array.isRequired,
    score: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ),
  }
  render() {
    let formatDate = moment(createdAt).fromNow()
    const {
      score,
      answers,
      title,
      description,
      createdAt,
      tags,
      authorUsername,
      questionId,
      authorId,
      slug,
      authorAvatar,
      authorFullName,
    } = this.props
    return (
      <Card>
        <Link as={`question/${questionId}/${slug}`} href={`question/${questionId}/${slug}`}>
          <Title>{title}</Title>
        </Link>

        <Row>
          <Link href={`profile/${authorId}`} as={`profile/${authorId}/${authorUsername}`}>
            {authorAvatar ? (
              <UserAvatar src={authorAvatar} alt={authorUsername} />
            ) : (
              <Avatar
                size={32}
                style={{
                  marginRight: '16px',
                  verticalAlign: 'middle',
                  cursor: 'pointer',
                  color: '#f56a00',
                  backgroundColor: '#fde3cf',
                }}
              >
                {getAvatarLetter(authorUsername, authorFullName)}
              </Avatar>
            )}
          </Link>
          <Link href={`profile/${authorId}`} as={`profile/${authorId}/${authorUsername}`}>
            <UserDisplayName>{authorUsername}</UserDisplayName>
          </Link>

          <DotTextSeparator />
          <Date>{formatDate}</Date>
        </Row>

        <Description
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
        <TagsList>
          {tags.map(tag => (
            <TagWithLink key={tag.id + tag.slug} text={tag.title} url="/" style={{ marginRight: '5px' }} />
          ))}
        </TagsList>
        <CountersRow>
          <ScoreCounterIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png" />
          <CounterValue>{score}</CounterValue>

          <AnswersCommentsCouterIcon name="comments" height="18px" />
          <CounterValue>{answers.length}</CounterValue>
        </CountersRow>
      </Card>
    )
  }
}

const getAvatarLetter = (username, full_name) => {
  if (!!full_name) {
    return full_name.charAt(0).toUpperCase()
  } else if (!!username) {
    return username.charAt(0).toUpperCase()
  } else return
}

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`

const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
  line-height: 28px;
  color: #000;
  margin-right: 8px;
  cursor: pointer;
  width: 100%;
  @media screen and (max-width: 745px) {
    font-size: 24px;
    max-width: 70%;
    width: auto;
  }
`

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  margin-right: 6px;
  cursor: pointer;
`

const UserDisplayName = styled.span`
  color: #000;
  font-size: 0.95rem;
  font-weight: bold;
  margin-right: 6px;
  cursor: pointer;
`

const DotTextSeparator = styled.div`
  margin-right: 6px;
  background: #000;
  width: 3px;
  height: 3px;
  border-radius: 50%;
`

const Date = styled.span`
  color: ${props => props.theme.darkGrey};
  font-size: 14px;
  width: 30%;
  @media screen and (max-width: 745px) {
    max-width: 30%;
  }
`

const Description = styled.p`
  color: ${props => props.theme.darkGrey};
  font-size: 0.9rem;
`

const TagsList = styled.div`
  margin: 10px 0 20px -2px;
`

const CountersRow = styled(Row)`
  margin-right: 5px;
`

const ScoreCounterIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 7px;
`

const AnswersCommentsCouterIcon = styled(Icon)`
  margin-right: 7px;
`

const CounterValue = styled.span`
  display: inline-block;
  color: #4d4d4d;
  font-weight: bold;
  margin-right: 18px;
`

export default QuestionSummary
