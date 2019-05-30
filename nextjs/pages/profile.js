import React, { Component } from 'react'
import TwoSideLayout from '../components/TwoSideLayout'
import Jobs from '../components/SideWidgets/Jobs'
import Profile from '../components/Profile'
import { apiGet } from '../api'
import _ from 'lodash'

class ProfilePage extends Component {
  render() {
    return (
      <div>
        <TwoSideLayout left={this.props.user && <Profile {...this.props} />} right={<Jobs />} />
      </div>
    )
  }
}

ProfilePage.getInitialProps = async function({ query }) {
  try {
    let id = query.title
    let res = await apiGet.getUserProfile(id)
    const user = _.get(res, 'data', null)
    return {
      user,
    }
  } catch (error) {
    console.log('error', error)
  }
  return {
    user: {},
  }
}

export default ProfilePage
