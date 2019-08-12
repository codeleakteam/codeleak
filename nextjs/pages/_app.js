import React from 'react'
import _ from 'lodash'
import App, { Container } from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import SideMenu from '../components/SideMenu'
import Navigation from '../components/Navigation'
// import axios from 'axios'
import MainContentWrapper from '../components/MainContentWrapper'
import Footer from '../components/Footer'
import trackPageView from '../helpers/configs/trackPageView'
import Router from 'next/router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faComment, faEye, faBan } from '@fortawesome/free-solid-svg-icons'
import { parseCookies, destroyCookie } from 'nookies'
import axios from '../axios'

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
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    const { codeleakAuthToken } = parseCookies(ctx)
    return { pageProps, codeleakAuthToken, codeleakUser: ctx.codeleakUser }
  }

  componentDidMount() {
    Router.onRouteChangeComplete = url => {
      trackPageView(url)
    }
  }

  setRequestInterceptor = () => {
    const { codeleakAuthToken } = this.props
    this.requestInterceptor = axios.interceptors.request.use(
      config => {
        config.headers.Authorization = `JWT ${codeleakAuthToken}`
        return config
      },
      err => {
        return Promise.reject(err)
      }
    )
  }

  setResponseInterceptor = () => {
    axios.interceptors.response.use(
      response => response,
      err => {
        if (err.response && err.response.status === 401) {
          destroyCookie(undefined, 'codeleakUser')
          destroyCookie(undefined, 'codeleakAuthToken')
          axios.interceptors.request.eject(this.requestInterceptor)
          Router.push('/sign_in')
        }
        return Promise.reject(err)
      }
    )
  }

  handleBurgerMenuClick = () => this.setState(prevState => ({ isMenuActive: !prevState.isMenuActive }))

  render() {
    const { Component, pageProps } = this.props

    if (this.props.codeleakAuthToken) this.setRequestInterceptor()
    this.setResponseInterceptor()
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <GlobalStyle />
          <Navigation
            isMenuActive={this.state.isMenuActive}
            handleBurgerMenuClick={this.handleBurgerMenuClick}
            showLogo={true}
            showBurger={true}
            isResponsive={true}
            isLoggedIn={!!pageProps.codeleakUser}
            user={_.get(pageProps, 'codeleakUser', undefined)}
            authToken={this.props.codeleakAuthToken}
          />

          <MainContentWrapper>
            <Component {...pageProps} />
          </MainContentWrapper>
          <Footer />
          {/* <SideMenu isMenuActive={isMenuActive}>
            <Navigation
              isMenuActive={isMenuActive}
              handleBurgerMenuClick={this.handleBurgerMenuClick}
              showLogo={false}
              showBurger={false}
              isResponsive={true}
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
