import React from 'react'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

import classes from './index.scss'

const Comment = ({ authorName, content, score, upvoteComment, reportComment }) => {
  return (
    <div className={classes.comment__container}>
      <div className={classes.comment__heading}>
        <span className={classes.comment__user}>{authorName}</span>
        <span className={classes.comment__points}>{score} points</span>
      </div>
      <div className={classes.comment__box}>
        <div className={classes.comment__controls}>
          <FontAwesomeIcon icon="angle-up" size="lg" onClick={upvoteComment} />
          <FontAwesomeIcon icon="ban" size="sm" onClick={reportComment} />
        </div>
        <p className={classes.comment__text}>{content}</p>
      </div>
    </div>
  )
}

Comment.propTypes = {
  authorName: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  upvoteComment: PropTypes.func.isRequired,
  reportComment: PropTypes.func.isRequired,
}

export default Comment
