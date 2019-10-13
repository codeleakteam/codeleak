import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import TwoSideLayout from '../../components/TwoSideLayout'
import EditProfile from '../../components/EditProfile'
import { apiGet } from '../../api'
import _ from 'lodash'
import { Alert } from 'antd'
import { withAuthSync } from '../../helpers/functions/auth'

class EditProfilePage extends Component {
  static propTypes = {
    codeleakUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      reputation: PropTypes.number.isRequired,
      avatar: PropTypes.string,
      full_name: PropTypes.string,
    }),
    authToken: PropTypes.string.isRequired,
  }

  static async getInitialProps({ codeleakUser, codeleakAuthToken }) {
    try {
      const res = await apiGet.getUserProfile({ userID: codeleakUser.id, token: codeleakAuthToken })
      const user = _.get(res, 'data.user', null)
      if (!user) throw new Error('No user object available')
      return {
        user,
        error: false,
      }
    } catch (err) {
      console.error('[getInitialProps] staepuklo', { err })
      return {
        error: true,
      }
    }
  }

  render() {
    const title = this.props.error
      ? 'Internal server error'
      : this.props.user.full_name
      ? this.props.user.full_name
      : this.props.user.username

    return (
      <React.Fragment>
        <Head>
          <title>{title}</title>
        </Head>
        {this.props.error && <Alert message="Internal sever error" type="error" />}
        {!this.props.error && (
          <TwoSideLayout
            mainSectionElement={
              <EditProfile
                userData={this.props.user}
                codeleakUser={this.props.codeleakUser}
                token={this.props.codeleakAuthToken}
              />
            }
          />
        )}
      </React.Fragment>
    )
  }
}

export default withAuthSync(EditProfilePage)
