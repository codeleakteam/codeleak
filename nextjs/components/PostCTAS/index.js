import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import AddComment from '../AddComment'
import classes from './index.scss'

export default function PostCTAS({ postType, id, updateScore, submitComment, score }) {
  return (
    <div className={classes.ctas}>
      <div className={classes.ctas__row}>
        <button className={classes.ctas__voteBtn} onClick={() => updateScore('true', id, 1)}>
          <img src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png" className={classes.ctas__voteIcon} />
          <span className={classes.ctas__counterValue}>{score}</span>
        </button>
        <button className={classes.ctas__voteBtn} onClick={() => updateScore('false', id, 1)}>
          <img
            src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png"
            className={[classes.ctas__voteIcon, classes.ctas__downVoteIcon].join(' ')}
          />
        </button>
      </div>
      <div className={classes.ctas__row}>
        {postType === 'question' && (
          <Button type="primary" style={{ marginRight: '6px' }}>
            Provide an answer
          </Button>
        )}
        <AddComment objectId={id} submitComment={submitComment} />
      </div>
    </div>
  )
}

PostCTAS.propTypes = {
  postType: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  updateScore: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
}
