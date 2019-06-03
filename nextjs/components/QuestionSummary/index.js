import React from 'react'
import Icon from '../../assets/icons'
import TagWithLink from '../TagWithLink'
import Link from 'next/link'
// import CustomIcon from '../../assets/icons/index'
import moment from 'moment'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './index.scss'
import popularTagClasses from '../SideWidgets/PopularTags/index.scss'
const QuestionSummary = ({
  score,
  answers,
  title,
  description,
  createdAt,
  tags,
  author,
  questionId,
  authorId,
  viewedTimes,
  slug,
}) => {
  let formatDate = moment(createdAt).fromNow()

  return (
    <div className={classes.question__container}>
      {/* <div className={classes['question__info-container']}> */}
      {/* <div className={classes.question__info}>
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
        </div> */}
      {/* </div> */}
      <div className={classes.question__main}>
        <Link as={`question/${questionId}`} href={`question/?title=${questionId}`}>
          <p className={classes.question__name}>{title}</p>
        </Link>

        <div className={classes.question__meta}>
            <Link href={`/profile/?=${authorId}`} as={`/profile/${authorId}/${author}`}>
            <img
              className={classes.question__userAvatar}
              src="https://hashnode.imgix.net/res/hashnode/image/upload/v1559555582766/Bm5xyeBqE.jpeg?w=80&h=80&fit=crop&crop=faces&auto=format,enhance&q=60"
            />
          </Link>
            <Link href={`/profile/?=${authorId}`} as={`/profile/${authorId}/${author}`}>
            <span className={classes.question__userDisplayName}>Johnny</span>
          </Link>

          <div className={classes.question__dotSeparator} />
          <span className={classes.question__time}>{formatDate}</span>
        </div>

        <p className={classes.question__description}>{description}</p>
        <div className={classes.question__tags}>
          {tags.map(tag => (
            // <Link as={`/tags/${tag.id + tag.slug}`}>
            <TagWithLink
              key={tag.id + tag.slug}
              customClass={popularTagClasses.tag}
              text={tag.title}
              url="/"
              style={{ marginRight: '5px' }}
            />
            // <span className={classes.question__tag}>{tag.slug}</span>
            // </Link>
          ))}
        </div>
        <div className={classes.question__counters}>
          <img src="https://d3h1a9qmjahky9.cloudfront.net/app-1-min.png" className={classes.question__counterIcon} />
          <span className={classes.question__counterValue}>{answers.length}</span>

          <Icon className={classes.question__counterIcon} name="comments" height="18px" />
          <span className={classes.question__counterValue}>{answers.length}</span>
        </div>
      </div>
    </div>
  )
}

export default QuestionSummary
