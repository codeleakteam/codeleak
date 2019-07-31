import React, { Component } from 'react'
import Head from 'next/head'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { Button, Alert } from 'antd'
import QuestionList from '../components/QuestionList'
import Banner from '../components/Banner'
import PopularTags from '../components/SideWidgets/PopularTags'
import TwoSideLayout from '../components/TwoSideLayout'
import { apiGet } from '../api'
import _ from 'lodash'

class Index extends Component {
  static async getInitialProps() {
    try {
      const questionsRes = await apiGet.getIndex()
      const tagsRes = await apiGet.getTags({ q: '' })
      const questions = _.get(questionsRes, 'data.results', null)
      const tags = _.get(tagsRes, 'data.tags', null)
      if (!questions) throw new Error('[getInitialProps] questions not available')
      if (!tags) throw new Error('[getInitialProps] tags not available')
      return {
        questions,
        tags,
        error: false,
      }
    } catch (error) {
      console.error('[getInitialProps]', { error })
      return {
        error: true,
      }
    }
  }

  state = {
    errorMessage: null,
  }

  render() {
    return (
      <Wrapper isLoggedIn={this.props.isLoggedIn}>
        <Head>
          <title>Codeleak</title>
        </Head>
        {!this.props.isLoggedIn && <Banner />}
        {this.props.error && <Alert message="Internal server error" type="error" />}
        {!this.props.error && (
          <React.Fragment>
            <Heading>
              <Title>Questions</Title>
              <Link href="/questions/ask">
                <Button type="primary">Submit question</Button>
              </Link>
            </Heading>
            <TwoSideLayout
              mainSectionElement={<QuestionList isLoggedIn={this.props.isLoggedIn} questions={this.props.questions} />}
              rightSectionElement={<PopularTags tags={this.props.tags} />}
            />
          </React.Fragment>
        )}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  ${props =>
    !props.isLoggedIn &&
    css`
      margin-top: 350px;
      @media screen and (max-width: 740px) {
        margin-top: 560px;
      }
    `}
`

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  margin: 1rem 0;
  align-items: center;
  @media screen and (max-width: 740px) {
    width: 100%;
  }
`

const Title = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0;
`

export default Index
