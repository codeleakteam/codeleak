import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Activity from '../Activity'
import timeAgo from '../../helpers/functions/timeAgo'

const RecentActivities = ({ type, typeCounts, data }) => {
  return (
    <Wrapper>
      <ActivitiesHeader>
        <span>{typeCounts} </span>
        <span>{type}</span>
      </ActivitiesHeader>
      {data.map(d => {
        const title = type === 'answers' ? d.question.title : d.title
        const questionID = type === 'answers' ? d.question.id : d.id
        const questionSlug = type === 'answers' ? d.question.slug : d.slug
        return (
          <Activity
            type={type}
            key={d.id}
            questionID={questionID}
            questionSlug={questionSlug}
            title={title}
            score={d.score}
            timestamp={timeAgo(d.created_at)}
          />
        )
      })}
    </Wrapper>
  )
}

RecentActivities.propTypes = {
  type: PropTypes.string.isRequired,
  typeCounts: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
      // Required fileds here depend on activity type
      // Questions have title, answers and slug on them while answers themselves do not
      title: PropTypes.string,
      answers: PropTypes.array,
      slug: PropTypes.string,
    })
  ),
}
const Wrapper = styled.div``

const ActivitiesHeader = styled.div`
  font-size: 18px;
  line-height: 28px;
  border-bottom: 1px solid ${props => props.theme.antGrey};
  display: block;
  padding-bottom: 8px;
  margin-bottom: 8px;
`

export default RecentActivities
