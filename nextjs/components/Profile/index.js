import React from 'react'
import RecentActivities from '../RecentActivities'

import classes from './index.scss'

const Profile = props => {
  return (
    <div className={classes.profile__container}>
      <div className={classes.profile__leftSide}>
        <div className={classes.profile__avatar}>
          <img src="https://dummyimage.com/200x200/000/fff" alt="avatar" />
        </div>
        <div className={classes.profile__reputation}>
          <span>1000</span> reputation
        </div>
        <div className={classes['profile__q-a-container']}>
          <div className={classes['profile__count-box']}>
            Answers <span className={classes.profile__counter}>15</span>
          </div>
          <div className={classes['profile__count-box']}>
            Questions <span className={classes.profile__counter}>15</span>
          </div>
        </div>
      </div>
      <div className={classes.profile__rightSide}>
        <div className={classes.profile__details}>
          <span className={classes.user__name}>Branko Zivanovic</span>
          <div className={classes.user__title}>
            <span className={classes.user__position}>CEO</span>
            <span> at </span>
            <span className={classes.user__company}>Google</span>
            <span className={classes['user__company-location']}>, San Francisco</span>
          </div>
          <p className={classes.user__bio}>
            Jeffrey Preston Bezos is an American technology entrepreneur, investor, and philanthropist. He is the
            founder, chairman, CEO, and president of Amazon. Bezos was born in Albuquerque, New Mexico, and raised in
            Houston, Texas
          </p>
        </div>
        <RecentActivities type="Answers" typeCounts={13} />
      </div>
    </div>
  )
}

export default Profile
