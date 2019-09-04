import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Head from 'next/head'
import AskQuestion from '../../components/AskQuestion'
import { withAuthSync } from '../../helpers/functions/auth'

class AskQuestionPage extends Component {
  static propTypes = {
    codeleakUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      reputation: PropTypes.number.isRequired,
      avatar: PropTypes.string,
      full_name: PropTypes.string,
    }),
    authToken: PropTypes.string.isRequired,
  }
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Submit question</title>
        </Head>

        <div>
          <Title>Submit question</Title>
          <AskQuestion user={this.props.codeleakUser} authToken={this.props.authToken} />
        </div>
      </React.Fragment>
    )
  }
}

const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

export default withAuthSync(AskQuestionPage)
