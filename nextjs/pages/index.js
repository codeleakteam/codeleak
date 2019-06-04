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
        {!this.props.error && (
          <TwoSideLayout
            left={<QuestionSummaryContainer loggedIn={this.props.loggedIn} questions={this.props.questions} />}
            right={<PopularTags />}
          />
        )}
        {this.props.error && <Alert message="Could not load questions!" type="error" />}
      </div>
    )
  }
}

Index.getInitialProps = async function() {
  try {
    let res = await apiGet.getIndex()
    const questions = _.get(res, 'data.results', null)
    if (!questions) {
      return {
        error: true,
      }
    }
    return {
      questions,
      error: false,
    }
  } catch (error) {
    return {
      error: true,
    }
  }
  return {
    questions: [],
  }
}

export default Index
