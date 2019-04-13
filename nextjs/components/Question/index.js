import React from 'react'
import { Button, Icon, Dropdown, Menu } from 'antd'
import Link from 'next/link'
import TagWithLink from '../TagWithLink'
// import UpVote from '../CustomIcons/UpVote'
import CustomIcon from '../../assets/icons/index'
import Comment from '../Comment'

import classes from './index.scss'

const Question = () => {
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
      <h3 className={classes.question__name}>How do next.js applications optimize for mobile screens?</h3>
      <div className={classes.question__info}>
        <div className={classes.question__detail}>
          <Link href="/">
            <div className={classes.question__avatar}>
              <img
                src="https://dummyimage.com/43x43/000/fff"
                alt="user alt"
                className={classes['question__avatar-img']}
              />
            </div>
          </Link>
          <span className={classes.question__rep}>100</span>
        </div>
        <div className={classes['question__user-info']}>
          <Link href="/">
            <a>
              <span className={classes.question__user}>Jadranka Barjaktarevic</span>
            </a>
          </Link>

          <span className={classes.question__time}>18 hours ago</span>
        </div>
      </div>
      <div className={classes['question__tags-wrapper']}>
        <div>
          <TagWithLink url="/" text="tech" />
          <TagWithLink url="/" text="tech" />
          <TagWithLink url="/" text="tech" />
          <TagWithLink url="/" text="tech" />
          <TagWithLink url="/" text="tech" />
        </div>
        <div>
          <Link href="/">
            <Button type="primary">Open in editor</Button>
          </Link>
        </div>
      </div>
      <div className={classes.question__text}>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </p>
      </div>
      <div className={classes.question__controls}>
        <Button className={classes.question__upvote} type="primary">
          Upvote{' '}
          <CustomIcon
            name="upvote"
            height="20px"
            className={classes.question__arrow}
            strokeWidth={1}
            strokeColor="#d9d9d9"
          />
        </Button>
        <Button className={classes.question__downvote}>Downvote</Button>
        <Dropdown overlay={questionOptions}>
          <Icon type="more" style={{ fontSize: '30px' }} />
        </Dropdown>
      </div>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  )
}

export default Question
