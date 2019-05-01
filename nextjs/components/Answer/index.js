import React from 'react'
import { Button, Icon, Dropdown, Menu } from 'antd'
import Link from 'next/link'
import CustomIcon from '../../assets/icons/index'
import Comment from '../Comment'
import timeAgo from '../../helpers/timeAgo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './index.scss'

const Answer = ({ answer }) => {
  const answerOptions = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/">
          1st menu item
        </a>
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
    <div className={classes.answer__container}>
      <div className={classes.answer__info}>
        <div className={classes.answer__detail}>
          <Link href="/">
            <div className={classes.answer__avatar}>
              <img src={answer.author.avatar} alt={answer.author.username} className={classes['answer__avatar-img']} />
            </div>
          </Link>
          <span className={classes.answer__rep}>{answer.score}</span>
        </div>
        <div className={classes['answer__user-info']}>
          <Link href="/">
            <a>
              <span className={classes.answer__user}>{answer.author.username}</span>
            </a>
          </Link>

          <span className={classes.answer__time}>{timeAgo(answer.created_at)}</span>
        </div>
      </div>
      <div className={classes['answer__tags-wrapper']}>
        <div>
          <Link href="/">
            <Button type="primary">Open in editor</Button>
          </Link>
        </div>
      </div>
      <div className={classes.answer__text}>
        <p>{answer.description}</p>
      </div>
      <div className={classes.answer__controls}>
        <Button className={classes.answer__upvote} type="primary">
          Upvote
          {/* <CustomIcon
            name="upvote"
            height="20px"
            className={classes.answer__arrow}
            strokeWidth={1}
            strokeColor="#d9d9d9"
          /> */}
          <FontAwesomeIcon icon="angle-up" className={classes.answer__arrow} />
        </Button>
        <Button className={classes.answer__downvote}>Downvote</Button>
        <Dropdown overlay={answerOptions}>
          <Icon type="more" style={{ fontSize: '30px' }} />
        </Dropdown>
      </div>
      {answer.comments.map(comment => (
        <Comment />
      ))}
    </div>
  )
}

export default Answer
