import React, { Component } from 'react'
import Head from 'next/head'
import TwoSideLayout from '../components/TwoSideLayout'
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

  state = {
    activeTab: 'answers',
    editMode: false,
    user: {
      username: '',
      avatar: '',
      reputation: null,
      answers: [],
      questions: [],
      biography: '',
      full_name: '',
      location: '',
      looking_for_job: null,
      website_url: '',
      twitter_username: '',
      github_username: '',
    },
  }

  componentDidMount() {
    this.setState({
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
    })
  }

  changeTab = e => {
    this.setState({ activeTab: e.target.id })
  }

  enableEditMode = () => this.setState({ editMode: true })

  saveChanges = () => {
    console.log('saving changes')
    this.setState({ editMode: false })
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
                {...this.state.user}
              />
            }
          />
        )}
      </React.Fragment>
    )
  }
}

export default ProfilePage
