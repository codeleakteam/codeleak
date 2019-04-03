import React, { Component } from 'react'
import Link from 'next/link'
import { Button } from 'antd'
import QuestionSummaryContainer from '../components/QuestionSummaryContainer'
import Banner from '../components/Banner'
import PopularTags from '../components/PopularTags'

import TwoSideLayout from '../components/TwoSideLayout'

import classes from '../styles/index/index.scss'

class Index extends Component {
  render() {
    return (
      <div
        className={
          !this.props.loggedIn && [classes.section__container, classes['section__container--loggedOut']].join(' ')
        }
      >
        {!this.props.loggedIn && <Banner />}
        <div className={classes.section__heading}>
          <h2>Questions</h2>
          <Link href="/">
            <Button type="primary">Ask a question</Button>
          </Link>
        </div>
        <TwoSideLayout left={<QuestionSummaryContainer loggedIn={this.props.loggedIn} />} right={<PopularTags />} />
      </div>
    )
  }
}

export default Index
