import React, { Component } from 'react'
import Link from 'next/link'
import { Button } from 'antd'
import QuestionSummaryContainer from '../../components/QuestionSummaryContainer'
import Banner from '../../components/Banner'
import PopularTags from '../../components/SideWidgets/PopularTags'
import TwoSideLayout from '../../components/TwoSideLayout'
import { apiGet } from '../../api'
import _ from 'lodash'

// import classes from '../styles/index/index.scss'

class Index extends Component {
  state = {
    tags: null,
    questions: [],
  }
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
          <Link href="/questions/ask">
            <Button type="primary">Ask a question</Button>
          </Link>
        </div>
        <TwoSideLayout
          left={<QuestionSummaryContainer loggedIn={this.props.loggedIn} answers={this.props.answers} />}
          right={<PopularTags tagList={this.props.tags} />}
        />
      </div>
    )
  }
}

Index.getInitialProps = async function() {
  try {
    let res = await apiGet.getIndex()
    const tags = _.get(res, 'data.popular_tags', [])
    const answers = _.get(res, 'data.results', [])
    return {
      tags,
      answers,
    }
  } catch (error) {
    console.log('error', error)
  }
}

export default Index
