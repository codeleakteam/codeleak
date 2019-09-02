import React, { Component } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Link from 'next/link'
import { Button, Alert, message } from 'antd'
import QuestionList from '../components/QuestionList'
import { withAuthSync } from '../helpers/functions/auth'
import PopularTags from '../components/SideWidgets/PopularTags'
import TwoSideLayout from '../components/TwoSideLayout'
import { apiGet } from '../api'
import _ from 'lodash'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetchingQuestions: false,
      // Always changing list of questions
      questions: this.props.questions,
      currentPage: 1,
      haveNextPage: this.props.haveNextPage,
    }

    this.fetchMoreQuestions = _.debounce(this._fetchMoreQuestions, 1000)
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

  _fetchMoreQuestions = async (page = 1) => {
    if (this.state.isFetchingQuestions) return

    this.setState({ isFetchingQuestions: true, currentPage: page })

    try {
      const questionsRes = await apiGet.getIndex(page)
      const questions = _.get(questionsRes, 'data.results', null)
      const questionsNextPage = _.get(questionsRes, 'data.links.next', null)
      if (!questions) throw new Error('Could not fetch more questions')

      this.setState({
        isFetchingQuestions: false,
        questions: [...this.state.questions, ...questions],
        haveNextPage: !!questionsNextPage,
      })
    } catch (error) {
      message.error('Internal server error', { error })
      this.setState({
        isFetchingQuestions: false,
      })
    }
  }

  render() {
    return (
      <Wrapper>
        <Head>
          <title>codeleak</title>
        </Head>
        {this.props.error && <Alert message="Internal server error" type="error" />}
        {!this.props.error && (
          <React.Fragment>
            <Heading>
              <Title>Questions</Title>
              <Link href="/questions/ask">
                <Button icon="laptop" type="primary">
                  submit question
                </Button>
              </Link>
            </Heading>
            <TwoSideLayout
              mainSectionElement={
                <QuestionList
                  isFetchingQuestions={this.state.isFetchingQuestions}
                  currentPage={this.state.currentPage}
                  haveNextPage={this.state.haveNextPage}
                  isLoggedIn={this.props.isLoggedIn}
                  questions={this.state.questions}
                  fetchMoreQuestions={this.fetchMoreQuestions}
                />
              }
              rightSectionElement={
                <div
                  css={`
                    display: flex;
                    flex-flow: column nowrap;
                  `}
                >
                  <PopularTags
                    css={`
                      margin-bottom: 16px;
                    `}
                  />
                  <CodeleakSection>
                    <SectionTitle>© 2019 · Codeleak</SectionTitle>
                    <div>
                      <Row>
                        <a href="https://spectrum.chat/codeleak">🌍 Community</a>
                        <Link href="/terms">
                          <a>Terms of Use</a>
                        </Link>
                      </Row>

                      <Row>
                        <a href="https://spectrum.chat/codeleak/feature-requests?tab=posts">🚀 Request a feature </a>
                        <Link href="/privacy">
                          <a>Privacy</a>
                        </Link>
                      </Row>

                      <Row>
                        <a href="https://spectrum.chat/codeleak/feature-requests?tab=posts">🐛 Bug reports</a>
                        <Link href="/cookies">
                          <a>Cookies</a>
                        </Link>
                      </Row>
                      <Row>
                        <a href="https://spectrum.chat/codeleak/feature-requests?tab=posts">❤️ Become a sponsor</a>
                      </Row>
                    </div>
                  </CodeleakSection>
                </div>
              }
            />
          </React.Fragment>
        )}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  width: 100%;
`

const CodeleakSection = styled.div`
  background: white;
  padding: 0.9rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`

const SectionLinksWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const SectionTitle = styled.h4`
  color: #000;
  font-weight: bold;
  font-size: 20px;
`

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  margin: 1rem 0;
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
