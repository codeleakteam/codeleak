import React from 'react'
import TagWithLink from '../TagWithLink'
import Link from 'next/link'
import CustomIcon from '../../assets/icons/index'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './index.scss'

const QuestionSummary = ({ score, answers, title, createdAt, tags, author, questionId, authorId, viewedTimes }) => {
  let formatDate = moment(createdAt).fromNow()

  return (
    <div className={classes.question__container}>
      <div className={classes['question__info-container']}>
        <div className={classes.question__info}>
          <div className={classes['question__info-num']}>{score}</div>
          <div className={classes['question__info-icon']}>
            
            <FontAwesomeIcon icon="angle-up" size="lg" />
          </div>
        </div>
        <div className={classes.question__info}>
          <div className={classes['question__info-num']}>{answers.length}</div>
          <div className={classes['question__info-icon']}>
            
            <FontAwesomeIcon icon="comment" />
          </div>
        </div>
        <div className={classes.question__info}>
          <div className={classes['question__info-num']}>{viewedTimes}</div>
          <div className={classes['question__info-icon']}>
            
            <FontAwesomeIcon icon="eye" />
          </div>
        </div>
      </div>
      <div className={classes.question__main}>
        <div className={classes.question__heading}>
          <Link as={`question/${questionId}`} href={`question/?title=${questionId}`}>
            <h4 className={classes.question__name}>{title}</h4>
          </Link>
          <div className={classes.question__time}>{formatDate}</div>
        </div>
        <div className={classes.question__tags}>
          {tags.map(tag => (
            <TagWithLink key={tag.id + tag.slug} text={tag.title} url="/" />
          ))}
        </div>
        <Link as={`/profile/${authorId}`} href={`/profile/?=${authorId}`}>
          <a>
            <span className={classes.question__author}>{author}</span>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default QuestionSummary
