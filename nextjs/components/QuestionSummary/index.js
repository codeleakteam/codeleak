import React from 'react'
import TagWithLink from '../TagWithLink'
import Link from 'next/link'
import CustomIcon from '../../assets/icons/index'
import moment from 'moment'

import classes from './index.scss'

const QuestionSummary = ({ score, comments, title, createdAt, tags, author }) => {
  let formatDate = moment(createdAt).fromNow()

  return (
    <div className={classes.question__container}>
      <div className={classes['question__info-container']}>
        <div className={classes.question__info}>
          <div className={classes['question__info-num']}>{score}</div>
          <div className={classes['question__info-icon']}>
            <CustomIcon name="upvote" strokeColor="black" height="20px" />
          </div>
        </div>
        <div className={classes.question__info}>
          <div className={classes['question__info-num']}>0</div>
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
            <h4 className={classes.question__name}>{title}</h4>
          </Link>
          <div className={classes.question__time}>{formatDate}</div>
        </div>
        <div className={classes.question__tags}>
          {tags.map(tag => (
            <TagWithLink key={tag.id + tag.slug} text={tag.title} url="/" />
          ))}
        </div>
        <Link href="/profile">
          <a>
            <span className={classes.question__author}>{author}</span>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default QuestionSummary
