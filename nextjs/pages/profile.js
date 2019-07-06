import React, { Component } from 'react'
import Head from 'next/head'
import TwoSideLayout from '../components/TwoSideLayout'
import Profile from '../components/Profile'
import { apiGet, apiPut } from '../api'
import _ from 'lodash'
import { Alert, message } from 'antd'

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

  state = {
    activeTab: 'answers',
    editMode: false,
    user: {
      username: this.props.user.username,
      avatar: this.props.user.avatar,
      reputation: this.props.user.reputation,
      answers: this.props.user.answers,
      questions: this.props.user.questions,
      biography: this.props.user.biography,
      full_name: this.props.user.full_name,
      location: this.props.user.location,
      looking_for_job: this.props.user.looking_for_job,
      website_url: this.props.user.website_url,
      twitter_username: this.props.user.twitter_username,
      github_username: this.props.user.github_username,
    },
  }

  changeTab = e => {
    this.setState({ activeTab: e.target.id })
  }

  enableEditMode = () =>
    this.setState({
      editMode: true,
    })

  saveChanges = () => {
    this.setState({ editMode: false })
    this.updateUser(this.state.user, this.props.user.id)
  }

  editProfileFields = e => {
    if (e.target.name === 'looking_for_job') {
      this.setState({ user: { ...this.state.user, [e.target.name]: e.target.checked } })
    } else {
      this.setState({ user: { ...this.state.user, [e.target.name]: e.target.value } })
    }
  }

  updateUser = async (data, id) => {
    try {
      const res = await apiPut.updateUser(data, id)
      let user = _.get(res, 'data', null)
      let userId = _.get(res, 'data.id', null)
      if (!userId) throw new Error('Cannot update user data!')
      message.success('Profile is successfully updated!')
    } catch (error) {
      message.error('Could not update user data!')
    }
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>{!this.props.error ? this.props.user.full_name : 'Internal server error'}</title>
        </Head>
        {this.props.error && <Alert message="Internal sever error" type="error" />}
        {!this.props.error && (
          <TwoSideLayout
            mainSectionElement={
              <Profile
                changeTab={this.changeTab}
                activeTab={this.state.activeTab}
                editMode={this.state.editMode}
                enableEditMode={this.enableEditMode}
                saveChanges={this.saveChanges}
                userData={this.state.user}
                editProfileFields={this.editProfileFields}
              />
            }
          />
        )}
      </React.Fragment>
    )
  }
}

export default ProfilePage
