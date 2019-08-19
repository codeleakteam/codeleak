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
        return (
          <Activity
            type={type}
            key={d.id}
            slug={d.slug}
            id={d.id}
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
      title: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      answers: PropTypes.array.isRequired,
      slug: PropTypes.string.isRequired,
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
