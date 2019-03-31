import React, { Component } from 'react'
import Link from 'next/link'
import { Button } from 'antd'
import PopularTags from '../components/PopularTags'
import QuestionSummaryContainer from '../components/QuestionSummaryContainer'

import classes from '../styles/index/index.scss'

class Index extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={classes.section__heading}>
          <h2>Questions</h2>
          <Link href="/">
            <Button type="primary">Ask a question</Button>
          </Link>
        </div>
        <section className={classes.section__container}>
          <main className={classes.section__main}>
            <QuestionSummaryContainer />
          </main>
          <section className={classes.section__aside}>
            <PopularTags />
          </section>
        </section>
      </React.Fragment>
    )
  }
}

export default Index
