import React from 'react'
import RecentActivities from '../RecentActivities'

import classes from './index.scss'

const Profile = ({ user }) => {
  console.log(user)

  return (
    <div className={classes.profile__container}>
      <div className={classes.profile__leftSide}>
        <div className={classes.profile__avatar}>
          <img src={user.avatar} alt="avatar" />
        </div>
        <div className={classes.profile__reputation}>
          <span>{user.reputation}</span> reputation
        </div>
        <div className={classes['profile__q-a-container']}>
          <div className={classes['profile__count-box']}>
            Answers <span className={classes.profile__counter}>{user.answers.length}</span>
          </div>
          <div className={classes['profile__count-box']}>
            Questions <span className={classes.profile__counter}>{user.questions.length}</span>
          </div>
        </div>
      </div>
      <div className={classes.profile__rightSide}>
        <div className={classes.profile__details}>
          <span className={classes.user__name}>{user.full_name}</span>
          <div className={classes.user__title}>
            <span className={classes.user__position}>{user.role_in_company}</span>
            <span> at </span>
            <span className={classes.user__company}>{user.company}</span>
            <span className={classes['user__company-location']}>, {user.company_headquarters}</span>
          </div>
          <p className={classes.user__bio}>{user.biography}</p>
        </div>
        <RecentActivities type="Questions" typeCounts={user.questions.length} data={user.questions} />
      </div>
    </div>
  )
}

export default Profile
