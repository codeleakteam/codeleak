import React from 'react'

import TagWithLink from '../TagWithLink'

import Link from 'next/link'
import CustomIcon from '../../assets/icons/index'

import classes from './index.scss'

const QuestionSummary = props => {
  return (
    <div className={classes.question__container}>
      <div className={classes['question__info-container']}>
        <div className={classes.question__info}>
          <div className={classes['question__info-num']}>15</div>
          <div className={classes['question__info-icon']}>
            <CustomIcon name="upvote" strokeColor="black" height="20px" />
          </div>
        </div>
        <div className={classes.question__info}>
          <div className={classes['question__info-num']}>15</div>
          <div className={classes['question__info-icon']}>
            <CustomIcon name="comment" height="18px" />
          </div>
        </div>
        <div className={classes.question__info}>
          <div className={classes['question__info-num']}>15</div>
          <div className={classes['question__info-icon']}>
            <CustomIcon name="eye" height="20px" />
          </div>
        </div>
      </div>
      <div className={classes.question__main}>
        <div className={classes.question__heading}>
          <Link href="/questions/questionid">
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
        <Link href="/profile">
          <a>
            <span className={classes.question__author}>Mica</span>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default QuestionSummary
