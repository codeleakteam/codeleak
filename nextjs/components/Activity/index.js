import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import singularCheck from '../../helpers/functions/singularCheck'

const Activity = ({ name, points, answers, time, slug, id }) => {
  return (
    <Wrapper>
      <div
        css={`
          margin-bottom: 5px;
        `}
      >
        <Link as={`/question/${id}/${slug}`} href={`question/?title=${id}`}>
          <a>
            <ActivityName>{name}</ActivityName>
          </a>
        </Link>
        <PointsCounter>{points}</PointsCounter> <PointsIcon src="https://d3h1a9qmjahky9.cloudfront.net/app-5-min.png" />
      </div>
      <div>
        <AnswersCounter>
          {answers} {singularCheck('answer', answers)}
        </AnswersCounter>
        <AskedTimes>Asked {time}</AskedTimes>
      </div>
    </Wrapper>
  )
}

Activity.propTypes = {
  id: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  answers: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
}

const Wrapper = styled.div`
  margin-bottom: 1rem;
`
const ActivityName = styled.span`
  font-size: 1.1rem;
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
  font-size: 0.9rem;
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
