import React from 'react'
import PropTypes from 'prop-types'
import Activity from '../Activity'
import timeAgo from '../../helpers/functions/timeAgo'

import classes from './index.scss'

const RecentActivities = ({ type, typeCounts, data }) => {
  return (
    <div className={classes.activities__container}>
      <span className={classes.activities__header}>
        <span>{typeCounts} </span>
        <span>{type}</span>
      </span>
      {data.map(d => {
        return (
          <Activity
            key={d.id}
            url={d.slug}
            name={d.title}
            points={d.score}
            answers={d.answers.length}
            time={timeAgo(d.created_at)}
          />
        )
      })}
    </div>
  )
}

RecentActivities.propTypes = {
  type: PropTypes.string.isRequired,
  typeCounts: PropTypes.number.isRequired,
}

export default RecentActivities
