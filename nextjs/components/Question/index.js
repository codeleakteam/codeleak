import React from 'react'
import { Button, Icon, Dropdown, Menu } from 'antd'
import Link from 'next/link'
import TagWithLink from '../TagWithLink'
import Comment from '../Comment'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import AddComment from '../AddComment'

import classes from './index.scss'

const Question = ({ data, updateQuestionScore, updatedQuestionScore }) => {
  const { question } = data

  let formatDate = moment(question.created_at).fromNow()

  const questionOptions = (
    <Menu>
      <Menu.Item>
        <Link href="/questions/edit">
          <a>Edit question</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/">
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={classes.question__container}>
      <h3 className={classes.question__name}>{question.title}</h3>
      <div className={classes.question__info}>
        <div className={classes.question__detail}>
          <Link href={`/profile/${question.author.id}`}>
            <div className={classes.question__avatar}>
              <img
                src={question.author.avatar}
                alt={question.author.username}
                className={classes['question__avatar-img']}
              />
            </div>
          </Link>
          <span className={classes.question__rep}>{question.author.reputation}</span>
        </div>
        <div className={classes['question__user-info']}>
          <Link href={`/profile/${question.author.id}`}>
            <a>
              <span className={classes.question__user}>{question.author.username}</span>
            </a>
          </Link>

          <span className={classes.question__time}>{formatDate}</span>
        </div>
      </div>
      <div className={classes['question__tags-wrapper']}>
        <div>
          {question.tags.map(q => {
            return <TagWithLink url={`/tag/${q.slug}`} id={q.id} text={q.title} key={q.id} />
          })}
        </div>
        <div>
          <Link href="/">
            <Button type="primary">Open in editor</Button>
          </Link>
        </div>
      </div>
      <div className={classes.question__text}>
        <p>{question.description}</p>
      </div>
      <div className={classes.question__controls}>
        <Button
          className={classes.question__upvote}
          type="primary"
          onClick={() => updateQuestionScore('true', question.id, 1)}
        >
          Upvote
          <FontAwesomeIcon icon="angle-up" className={classes.question__arrow} />
          <span className={classes.question__score}>
            {updatedQuestionScore ? updatedQuestionScore : question.score}
          </span>
        </Button>
        <Button className={classes.question__downvote} onClick={() => updateQuestionScore('false', question.id, 1)}>
          Downvote
        </Button>
        <Dropdown overlay={questionOptions}>
          <Icon type="more" style={{ fontSize: '30px' }} />
        </Dropdown>
      </div>
      {question.comments.map(c => (
        <Comment key={c.id + c.score} id={c.id} authorName={c.author.username} content={c.content} score={c.score} />
      ))}
      <AddComment />
    </div>
  )
}

Question.propTypes = {
  data: PropTypes.object.isRequired,
  updateQuestionScore: PropTypes.func.isRequired,
}

export default Question
