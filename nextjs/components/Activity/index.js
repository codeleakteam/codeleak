import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import singularCheck from '../../helpers/functions/singularCheck'

import classes from './index.scss'

const Activity = ({ name, points, answers, time, url }) => {
  return (
    <div className={classes.activity__container}>
      <div>
        <Link href={`/questions/${url}`}>
          <a>
            <span className={classes.activity__name}>{name}</span>
          </a>
        </Link>
        <span className={classes.activity__points}>
          {points} {singularCheck('point', points)}
        </span>
      </div>
      <div className={classes.acitivies__history}>
        <span className={classes.activity__answers}>
          {answers} {singularCheck('answer', answers)}
        </span>
        <span className={classes.acitivies__time}>Asked {time}</span>
      </div>
    </div>
  )
}

Activity.propTypes = {
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  answers: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
}

export default Activity
