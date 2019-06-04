import React, { Component } from 'react'
import TwoSideLayout from '../components/TwoSideLayout'
import Jobs from '../components/SideWidgets/Jobs'
import Profile from '../components/Profile'
import { apiGet } from '../api'
import _ from 'lodash'
import { Alert } from 'antd'

class ProfilePage extends Component {
  render() {
    return (
      <div>
        {this.props.error && <Alert message="Could not load profile!" type="error" />}
        {!this.props.error && <TwoSideLayout left={this.props.user && <Profile {...this.props} />} right={<Jobs />} />}
      </div>
    )
  }
}

ProfilePage.getInitialProps = async function({ query }) {
  try {
    let id = query.title
    let res = await apiGet.getUserProfile(id)
    const user = _.get(res, 'data', null)
    if (!user) {
      return {
        error: true,
      }
    }
    return {
      user,
      error: false,
    }
  } catch (error) {
    return {
      error: true,
    }
  }
  return {
    user: {},
  }
}

export default ProfilePage
