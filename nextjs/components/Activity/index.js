import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import singularCheck from '../../helpers/functions/singularCheck'

const Activity = ({ name, points, answers, time, slug, id }) => {
  return (
    <Wrapper>
      <div>
        <Link as={`/question/${id}/${slug}`} href={`question/?title=${id}`}>
          <a>
            <ActivityName>{name}</ActivityName>
          </a>
        </Link>
        <PointsCounter>
          {points} {singularCheck('point', points)}
        </PointsCounter>
      </div>
      <div>
        <AnswersCounter>
          {answers} {singularCheck('answer', answers)}
        </AnswersCounter>
        <QuestionsCounter>Asked {time}</QuestionsCounter>
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
  margin-bottom: 16px;
`
const ActivityName = styled.span`
  font-size: 16px;
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
  font-size: 12px;
  line-height: 22px;
  margin-right: 8px;
`

const QuestionsCounter = styled.span`
  font-size: 12px;
  line-height: 22px;
`
const PointsCounter = styled.span`
  font-size: 14px;
  line-height: 22px;
`
export default Activity
