import React from 'react'
import CustomIcon from '../../assets/icons/index'
import { Icon } from 'antd'

import classes from './index.scss'

const Comment = () => {
  return (
    <div className={classes.comment__container}>
      <div>
        <span className={classes.comment__user}>Jadranka Barjaktarevic</span>
        <span className={classes.comment__points}>5 points</span>
      </div>
      <div className={classes.comment__box}>
        <div className={classes.comment__controls}>
          <CustomIcon name="upvote" />
          <Icon type="stop" style={{ fontSize: '13px' }} />
        </div>
        <p className={classes.comment__text}>
          lorem lore mrelo rem dkasjkds qalkdksaj dkjsa kdsakljdklsaj dkjaskldjska
        </p>
      </div>
    </div>
  )
}

export default Comment
