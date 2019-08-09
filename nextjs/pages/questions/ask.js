import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TwoSideLayout from '../../components/TwoSideLayout'
import AskQuestion from '../../components/AskQuestion'
import AskGuide from '../../components/SideWidgets/AskGuide'
import { withAuthSync } from '../../helpers/functions/auth'
import Head from 'next/head'

class AskQuestionPage extends Component {
  static propTypes = {
    codeleakUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      reputation: PropTypes.number.isRequired,
      avatar: PropTypes.string,
      full_name: PropTypes.string,
    }),
  }
  render() {
    return (
      <React.Fragment>
        {/* <Head>
          <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
        </Head> */}
        <div>
          <Title>Submit question</Title>
          <AskQuestion user={this.props.codeleakUser} />
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
