import React, { Component } from 'react'
import Head from 'next/head'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { Button, Alert } from 'antd'
import QuestionList from '../components/QuestionList'
import { withAuthSync } from '../helpers/functions/auth'
import Banner from '../components/Banner'
import Navigation from '../components/Navigation'
import PopularTags from '../components/SideWidgets/PopularTags'
import TwoSideLayout from '../components/TwoSideLayout'
import { apiGet } from '../api'
import _ from 'lodash'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuActive: false,
      errorMessage: null,
      page: 0,
      loading: false,
      prevY: 0,
      questions: this.props.questions,
      currentPage: 1,
      haveNextPage: this.props.haveNextPage,
    }
  }

  static async getInitialProps(ctx) {
    try {
      const questionsRes = await apiGet.getIndex()
      const questions = _.get(questionsRes, 'data.results', null)
      const questionsNextPage = _.get(questionsRes, 'data.links.next', null)
      if (!questions) throw new Error('[getInitialProps] questions not available')

      return {
        questions,
        error: false,
        haveNextPage: questionsNextPage ? true : false,
      }
    } catch (error) {
      console.error('[getInitialProps]', { error })
      return {
        error: true,
      }
    }
  }

  componentDidMount() {
    var options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }

    this.observer = new IntersectionObserver(this.handleObserver.bind(this), options)

    this.observer.observe(this.loadingRef)
  }

  fetchMoreQuestions = async (page = 1) => {
    try {
      const questionsRes = await apiGet.getIndex(page)
      const questions = _.get(questionsRes, 'data.results', null)
      const questionsNextPage = _.get(questionsRes, 'data.links.next', null)

      if (!questions) throw new Error('Could not fetch more questions')

      this.setState({
        questions: [...this.state.questions, ...questions],
        haveNextPage: !!questionsNextPage,
      })
    } catch (error) {
      message.error('Internal server error', { error })
    }
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y
    if (this.state.prevY > y) {
      if (this.state.haveNextPage) {
        this.fetchMoreQuestions(this.state.currentPage + 1)
        this.setState({ currentPage: this.state.currentPage + 1 })
      }
    }
    this.setState({ prevY: y })
  }

  render() {
    return (
      <Wrapper>
        <Head>
          <title>Codeleak</title>
        </Head>

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
              mainSectionElement={<QuestionList isLoggedIn={this.props.isLoggedIn} questions={this.state.questions} />}
              rightSectionElement={<PopularTags />}
            />
            <div ref={loadingRef => (this.loadingRef = loadingRef)} />
          </React.Fragment>
        )}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  width: 100%;
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
  font-size: 1.25rem;
  margin: 0;
`

export default withAuthSync(Index)
