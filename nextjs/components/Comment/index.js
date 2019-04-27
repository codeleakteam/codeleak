import React from 'react'
import CustomIcon from '../../assets/icons/index'
import { Icon } from 'antd'
import _ from 'lodash'

import classes from './index.scss'

const Comment = ({ id, authorName, content, score }) => {
  return (
    <div className={classes.comment__container}>
      <div>
        <span className={classes.comment__user}>{authorName}</span>
        <span className={classes.comment__points}>{score} points</span>
      </div>
      <div className={classes.comment__box}>
        <div className={classes.comment__controls}>
          <CustomIcon name="upvote" />
          <Icon type="stop" style={{ fontSize: '13px' }} />
        </div>
        <p className={classes.comment__text}>{content}</p>
      </div>
    </div>
  )
}

export default Comment
