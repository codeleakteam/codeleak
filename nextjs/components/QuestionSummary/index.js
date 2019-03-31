import React from 'react'
import { Icon } from 'antd'
import TagWithLink from '../TagWithLink'
import UpVote from '../CustomIcons/UpVote'
import Link from 'next/link'

import classes from './index.scss'

const QuestionSummary = props => {
  return (
    <div className={classes.question__container}>
      <div className={classes['question__info-container']}>
        <div className={classes.question__info}>
          <div className={classes['question__info-num']}>15</div>
          <div className={classes['question__info-icon']}>
            <UpVote className={classes.icon} />
          </div>
        </div>
        <div className={classes.question__info}>
          <div className={classes['question__info-num']}>15</div>
          <div className={classes['question__info-icon']}>
            <Icon type="message" className={classes.icon} />
          </div>
        </div>
        <div className={classes.question__info}>
          <div className={classes['question__info-num']}>15</div>
          <div className={classes['question__info-icon']}>
            <Icon type="eye" className={classes.icon} />
          </div>
        </div>
      </div>
      <div className={classes.question__main}>
        <div className={classes.question__heading}>
          <Link href="/signin">
            <h4 className={classes.question__name}>How do i use CSS?</h4>
          </Link>
          <div className={classes.question__time}>3m ago</div>
        </div>
        <div className={classes.question__tags}>
          <TagWithLink text="tag" url="/" />
          <TagWithLink text="tag" url="/" />
          <TagWithLink text="tag" url="/" />
          <TagWithLink text="tag" url="/" />
          <TagWithLink text="tag" url="/" />
        </div>
        <Link href="/">
          <span className={classes.question__author}>Mica</span>
        </Link>
      </div>
    </div>
  )
}

export default QuestionSummary
