import React from 'react'
import _ from 'lodash'
import App, { Container } from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import Navigation from '../components/Navigation'
import MainContentWrapper from '../components/MainContentWrapper'
import trackPageView from '../helpers/configs/trackPageView'
import Router from 'next/router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faComment, faEye, faBan } from '@fortawesome/free-solid-svg-icons'
import { parseCookies } from 'nookies'
import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: 'https://66e6fd9fe82e42f1b636c99f0e5cc527@sentry.io/1510922',
})

library.add(faAngleUp, faComment, faEye, faBan)

const theme = {
  clBlue: '#3e6fb5',
  antBlue: '#1890ff',
  antGrey: '#d9d9d9',
  lightGrey: '#e0e0e0',
  darkGrey: '#757575',
  darkerDarkGrey: '#4d4d4d',
  dirtyWhite: '#f1f1f1',
  lightBlack: '#757575',
  nextBlack: '#141617',
  antTagGrey: '#e6e8ed',
}

class MyApp extends App {
  state = {
    isMenuActive: false,
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    const { codeleakAuthToken } = parseCookies(ctx)
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ...ctx, codeleakAuthToken })
    }
    return { pageProps, codeleakAuthToken, codeleakUser: ctx.codeleakUser }
  }

  componentDidMount() {
    Router.onRouteChangeComplete = url => {
      trackPageView(url)
    }
  }

  componentDidCatch(error, errorInfo) {
    console.log('[componentDidCatch]')
    Sentry.withScope(scope => {
      console.log('[componentDidCatch] Sentry withscope')
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })

      Sentry.captureException(error)
    })

    super.componentDidCatch(error, errorInfo)
  }

  handleBurgerMenuClick = () => this.setState(prevState => ({ isMenuActive: !prevState.isMenuActive }))

  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <GlobalStyle />
          <Navigation
            isMenuActive={this.state.isMenuActive}
            handleBurgerMenuClick={this.handleBurgerMenuClick}
            showLogo={true}
            showBurger={true}
            isLoggedIn={!!pageProps.codeleakUser}
            user={_.get(pageProps, 'codeleakUser', undefined)}
            authToken={this.props.codeleakAuthToken}
          />

          <MainContentWrapper>
            <Component {...pageProps} authToken={this.props.codeleakAuthToken} />
          </MainContentWrapper>
          {/* <Footer /> */}
          {/* <SideMenu isMenuActive={isMenuActive}>
            <Navigation
              isMenuActive={isMenuActive}
              handleBurgerMenuClick={this.handleBurgerMenuClick}
              showLogo={false}
              showBurger={false}
              isLoggedIn={isLoggedIn}
            />
          </SideMenu> */}
        </Container>
      </ThemeProvider>
    )
  }
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Avenir,-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei','Helvetica Neue',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol',sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    position: relative;
    min-height: 100%;
    height: auto;
  }
  :root{
    font-size: 18px;
  }
  body {
    margin: 0;
    font-family: Avenir,-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei','Helvetica Neue',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol',sans-serif;
    height: 100%;
    min-height: 100%;
    background: #eff1f4;
    margin-bottom: -130px;
  }
  a {
    text-decoration: none;
  }
  li {
    list-style: none;
  }
  p {
    margin-bottom: 0;
  }
`

export default MyApp
