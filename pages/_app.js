import React from 'react'
import _ from 'lodash'
import App from 'next/app'
import Router, { withRouter } from 'next/router'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import nextCookie from 'next-cookies'
import * as Sentry from '@sentry/browser'
import { library } from '@fortawesome/fontawesome-svg-core'
import Navigation from '../components/Navigation'
import MainContentWrapper from '../components/MainContentWrapper'
import trackPageView from '../helpers/configs/trackPageView'
import { faAngleUp, faComment, faEye, faBan } from '@fortawesome/free-solid-svg-icons'
import Banner from '../components/Banner'
import GdprNotification from '../components/GDPRNotification'

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

    const { codeleakAuthToken } = nextCookie(ctx)
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ...ctx, codeleakAuthToken })
    }

    return { pageProps, codeleakAuthToken, codeleakUser: ctx.codeleakUser }
  }

  componentDidMount() {
    if (!localStorage.getItem('codeleak-cookies')) {
      GdprNotification()
    }
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
    const { Component, pageProps, router } = this.props
    const isLoggedIn = !!pageProps.codeleakUser

    const shouldRenderBanner = router.asPath === '/' && !isLoggedIn

    return (
      <ThemeProvider theme={theme}>
        <div>
          <GlobalStyle />
          <Navigation
            isMenuActive={this.state.isMenuActive}
            handleBurgerMenuClick={this.handleBurgerMenuClick}
            showBurger={true}
            isLoggedIn={isLoggedIn}
            user={pageProps.codeleakUser}
            authToken={this.props.codeleakAuthToken}
          />
          {shouldRenderBanner && <Banner />}
          <MainContentWrapper>
            <Component {...pageProps} authToken={this.props.codeleakAuthToken} codeleakUser={pageProps.codeleakUser} />
          </MainContentWrapper>
        </div>
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
  .ant-notification.ant-notification-bottomLeft{
    width: 100%;
    margin: 0 auto!important;
    right: 0;
  }
  .ant-notification-notice.ant-notification-notice-closable{
    margin-bottom:0;
  }
  .ant-notification-notice-icon{
    margin-top:8px;
  }

`

export default withRouter(MyApp)
