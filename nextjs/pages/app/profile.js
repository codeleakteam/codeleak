import React from 'react'
import TwoSideLayout from '../../components/TwoSideLayout'
import Jobs from '../../components/SideWidgets/Jobs'
import Profile from '../../components/Profile'

const ProfilePage = props => {
  return (
    <div>
      <TwoSideLayout left={<Profile />} right={<Jobs />} />
    </div>
  )
}

export default ProfilePage
