import React from 'react'
import { Button, Icon, Dropdown, Menu } from 'antd'
import Link from 'next/link'
import TagWithLink from '../TagWithLink'
import UpVote from '../CustomIcons/UpVote'
import Comment from '../Comment'

import classes from './index.scss'

const Answer = props => {
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
          <Link href="/" className={classes.answer__avatar}>
            <div>
              <img
                src="https://dummyimage.com/43x43/000/fff"
                alt="user alt"
                className={classes['answer__avatar-img']}
              />
            </div>
          </Link>
          <span className={classes.answer__rep}>100</span>
        </div>
        <div className={classes['answer__user-info']}>
          <Link href="/">
            <a>
              <span className={classes.answer__user}>Jadranka Barjaktarevic</span>
            </a>
          </Link>

          <span className={classes.answer__time}>18 hours ago</span>
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
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </p>
      </div>
      <div className={classes.answer__controls}>
        <Button className={classes.answer__upvote}>
          Upvote <UpVote className={classes.answer__arrow} />
        </Button>
        <Button type="primary" className={classes.answer__downvote}>
          Downvote
        </Button>
        <Dropdown overlay={answerOptions}>
          <Icon type="more" style={{ fontSize: '30px' }} />
        </Dropdown>
      </div>
      <Comment />
      <Comment />
    </div>
  )
}

export default Answer
