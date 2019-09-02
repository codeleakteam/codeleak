import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Avatar, Divider } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import Link from 'next/link'
import Card from '../Card'
import TagWithLink from '../TagWithLink'
import CustomIcon from '../../assets/icons'

class QuestionSummary extends Component {
  static propTypes = {
    authorId: PropTypes.number.isRequired,
    authorUsername: PropTypes.string.isRequired,
    authorFullName: PropTypes.string,
    questionId: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    repositoryUrl: PropTypes.string.isRequired,
    answers: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    score: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ),
    setLastItemRef: PropTypes.func,
  }
  render() {
    const {
      score,
      answers,
      comments,
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
      repositoryUrl,
      setLastItemRef,
      id,
    } = this.props
    const formatDate = moment(createdAt).fromNow()
    const answersAndCommentsCount = answers.length + comments.length

    return (
      <Card
        key={id}
        ref={setLastItemRef ? lastItemRef => setLastItemRef({ lastItemRef, lastItemRefFakeId: id }) : undefined}
      >
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
        <StyledDivider />
        <CountersRow>
          <RoundedWrapper>
            <ScoreCounterIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png" />
            <RoundedItemText>{score}</RoundedItemText>
            <AnswersCommentsCouterIcon name="comments" height="18px" />
            <RoundedItemText isLast={true}>{answersAndCommentsCount}</RoundedItemText>
          </RoundedWrapper>
          <RoundedAnchor target="_blank" href={repositoryUrl}>
            <Icon
              type="code-sandbox"
              css={`
                margin-right: 8px;
              `}
            />
            <RoundedItemText isLast={true}>code</RoundedItemText>
          </RoundedAnchor>
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
  margin-right: 8px;
`

const AnswersCommentsCouterIcon = styled(CustomIcon)`
  margin-right: 8px;
`

const RoundedItemText = styled.span`
  display: inline-block;
  color: #4d4d4d;
  font-weight: bold;
  margin-right: ${props => (props.isLast ? '0px' : '18px')};
`

const RoundedBase = () => `
  display: flex;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  padding: 0.25rem 0.75rem;
`
const RoundedWrapper = styled.div`
  background: ${props => props.theme.dirtyWhite};
  ${RoundedBase};
  margin-right: 8px;
`

const RoundedAnchor = styled.a`
  color: #4d4d4d;
  ${RoundedBase};
  cursor: pointer;
  :hover {
    background: ${props => props.theme.dirtyWhite};
    color: #4d4d4d;
  }
`
const StyledDivider = styled(Divider)`
  margin: 16px 0;
`

export default QuestionSummary
