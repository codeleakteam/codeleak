import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'

const Activity = ({ title, type, score, timestamp, questionSlug, questionID }) => {
  const verb = type === 'answers' ? 'Answered' : 'Asked'
  return (
    <Wrapper>
      <div>
        <Link href={`/question/${questionID}/${questionSlug}`}>
          <a>
            <ActivityName>{title}</ActivityName>
          </a>
        </Link>
        <PointsCounter>{score}</PointsCounter> <PointsIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-5-min.png" />
      </div>
      <div>
        <AskedTimes>
          {verb} {timestamp}
        </AskedTimes>
      </div>
    </Wrapper>
  )
}

Activity.propTypes = {
  questionID: PropTypes.number.isRequired,
  questionSlug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  timestamp: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

const Wrapper = styled.div`
  margin-bottom: 1rem;
`
const ActivityName = styled.span`
  font-size: 0.9rem;
  line-height: 22px;
  &:after {
    content: '';
    width: 4px;
    height: 4px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
    background-color: black;
    margin: 0 8px;
  }
`
const AnswersCounter = styled.span`
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 22px;
  margin-right: 8px;
`

const AskedTimes = styled.span`
  font-size: 0.75rem;
  line-height: 22px;
`
const PointsCounter = styled.span`
  font-size: 14px;
  line-height: 22px;
  font-weight: bold;
  color: ${props => props.theme.darkerDarkGrey};
`
const PointsIcon = styled.img`
  width: 18px;
  height: 18px;
`
export default Activity
