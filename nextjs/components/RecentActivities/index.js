import React from 'react'
import PropTypes from 'prop-types'
import Activity from '../Activity'

import classes from './index.scss'

const RecentActivities = ({ type, typeCounts }) => {
  return (
    <div className={classes.activities__container}>
      <span className={classes.activities__header}>
        <span>{typeCounts} </span>
        <span>{type}</span>
      </span>
      <Activity name="What is weirdest thing you have ever seen?" points={10} answers={3} time="10h" />
      <Activity name="What is weirdest thing you have ever seen?" points={1} answers={1} time="10h" />
      <Activity name="What is weirdest thing you have ever seen?" points={4} answers={3} time="10h" />
    </div>
  )
}

RecentActivities.propTypes = {
  type: PropTypes.string.isRequired,
  typeCounts: PropTypes.number.isRequired,
}

export default RecentActivities
