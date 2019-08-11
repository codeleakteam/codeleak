import React, { Component } from 'react'
import _ from 'lodash'
import Head from 'next/head'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AddAnswer from '../components/AddAnswer'
import { withAuthSync } from '../helpers/functions/auth'
import { apiGet } from '../api'

class AddAnswerPage extends Component {
  static async getInitialProps({ query }) {
    try {
      const res = await apiGet.getQuestion(query.id)
      const question = _.get(res, 'data.question', null)
      if (!question) throw new Error('No question object available')
      return {
        question,
        error: false,
      }
    } catch (err) {
      console.log('[getInitialProps]', { err })
      return {
        error: true,
      }
    }
  }
  static propTypes = {
    codeleakUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      reputation: PropTypes.number.isRequired,
      avatar: PropTypes.string,
      full_name: PropTypes.string,
    }),
    question: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      repository_url: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      comments: PropTypes.array.isRequired,
      tags: PropTypes.array.isRequired,
      author: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
      }),
      fs: PropTypes.object.isRequired,
      dependencies: PropTypes.object.isRequired,
    }),
  }
  render() {
    console.log('[render]', { props: this.props })
    return (
      <div>
        <Head>
          <title>Submit answer</title>
        </Head>

        <Title>Submit answer</Title>
        {!this.props.error && <AddAnswer question={this.props.question} user={this.props.codeleakUser} />}
      </div>
    )
  }
}

const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 16px;
`

export default withAuthSync(AddAnswerPage)
