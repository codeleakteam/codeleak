import React, { Component } from 'react'
import TwoSideLayout from '../components/TwoSideLayout'
import Jobs from '../components/SideWidgets/Jobs'
import Profile from '../components/Profile'
import { apiGet } from '../api'
import _ from 'lodash'
import { Alert } from 'antd'

class ProfilePage extends Component {
  static async getInitialProps({ query }) {
    try {
      const { id } = query
      const res = await apiGet.getUserProfile(id)
      const user = _.get(res, 'data.user', null)
      if (!user) throw new Error('No user object available')
      return {
        user,
        error: false,
      }
    } catch (err) {
      console.error('[getInitialProps]', { err })
      return {
        error: true,
      }
    }
  }
  render() {
    return (
      <div>
        {this.props.error && <Alert message="Could not load profile!" type="error" />}
        {!this.props.error && (
          <TwoSideLayout mainSectionElement={<Profile {...this.props.user} />} rightSectionElement={<Jobs />} />
        )}
      </div>
    )
  }
}

export default ProfilePage
