import React from 'react'
import { Button, Icon, DropDown } from 'antd'
import Link from 'next/link'
import TagWithLink from '../TagWithLink'
import UpVote from '../CustomIcons/UpVote'

import classes from './index.scss'

const Question = () => {
  return (
    <div>
      <h3 className={classes.question__name}>How do next.js applications optimize for mobile screens?</h3>
      <div className={classes.question__info}>
        <div className={classes.question__detail}>
          <Link href="/" className={classes.question__avatar}>
            <div>
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
          <TagWithLink text="tech" />
          <TagWithLink text="tech" />
          <TagWithLink text="tech" />
          <TagWithLink text="tech" />
          <TagWithLink text="tech" />
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
        <Button className={classes.question__upvote}>
          Upvote <UpVote className={classes.question__arrow} />
        </Button>
        <Button type="primary" className={classes.question__downvote}>
          Downvote
        </Button>
        <Icon type="more" style={{ fontSize: '30px' }} />
      </div>
    </div>
  )
}

export default Question
