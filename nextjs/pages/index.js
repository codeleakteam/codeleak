import React, { Component } from 'react'
import Link from 'next/link'
import { Button, Alert, message } from 'antd'
import QuestionSummaryContainer from '../components/QuestionSummaryContainer'
import Banner from '../components/Banner'
import PopularTags from '../components/SideWidgets/PopularTags'
import TwoSideLayout from '../components/TwoSideLayout'
import { apiGet } from '../api'
import _ from 'lodash'

import classes from '../styles/index/index.scss'

class Index extends Component {
  state = {
    errorMessage: null,
  }
  render() {
    return (
      <div
        className={
          !this.props.loggedIn ? [classes.section__container, classes['section__container--loggedOut']].join(' ') : null
        }
      >
        {!this.props.loggedIn && <Banner />}
        <div className={classes.section__heading}>
          <h2 className={classes.section__title}>Questions</h2>
          <Link href="/questions/ask">
            <Button type="primary">Ask a question</Button>
          </Link>
        </div>
        <TwoSideLayout
          left={<QuestionSummaryContainer loggedIn={this.props.loggedIn} questions={this.props.questions} />}
          right={<PopularTags />}
        />
        {this.state.errorMessage && <Alert message={this.props.errorMessage} type="error" />}
      </div>
    )
  }
}

Index.getInitialProps = async function() {
  try {
    let res = await apiGet.getIndex()
    const questions = _.get(res, 'data.results', null)
    if (!questions) {
      // message.error('test')
      throw new Error()
    }
    return {
      questions,
    }
  } catch (error) {
    console.log('error', error)
    message.error('test')
  }
  return {
    questions: [],
  }
}

export default Index
