import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import TwoSideLayout from '../components/TwoSideLayout'
import Profile from '../components/Profile'
import { apiGet, apiPut } from '../api'
import _ from 'lodash'
import { Alert, message } from 'antd'
import { withAuthSync } from '../helpers/functions/auth'

class ProfilePage extends Component {
  static propTypes = {
    codeleakUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      reputation: PropTypes.number.isRequired,
      avatar: PropTypes.string,
      full_name: PropTypes.string,
    }),
    authToken: PropTypes.string.isRequired,
  }
  static async getInitialProps({ query, codeleakAuthToken }) {
    try {
      const { id } = query
      const res = await apiGet.getUserProfile({ userID: id, token: codeleakAuthToken })
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
    console.log(this.props)

    return (
      <React.Fragment>
        <Head>
          <title>
            {this.props.user && this.props.user.full_name ? this.props.user.full_name : this.props.user.username}
          </title>
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
                userData={this.props.user}
                editProfileFields={this.editProfileFields}
                codeleakUser={this.props.codeleakUser}
              />
            }
          />
        )}
      </React.Fragment>
    )
  }
}

export default withAuthSync(ProfilePage)
