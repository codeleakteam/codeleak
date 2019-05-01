import React from 'react'
import App, { Container } from 'next/app'
import SideMenu from '../components/SideMenu'
import Navigation from '../components/Navigation'
// import PopularTags from '../components/PopularTags'
import Footer from '../components/Footer'
import trackPageView from '../helpers/trackPageView'
import Router from 'next/router'

import classes from '../styles/layout.module.scss'
import '../styles/global.scss'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faComment, faEye, faBan } from '@fortawesome/free-solid-svg-icons'
library.add(faAngleUp, faComment, faEye, faBan)

class MyApp extends App {
  state = {
    menuActive: false,
    loggedIn: false,
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  componentDidMount() {
    Router.onRouteChangeComplete = url => {
      trackPageView(url)
    }
  }

  handleBurgerMenu = () => {
    this.setState((state, props) => ({ menuActive: !state.menuActive }))
  }

  render() {
    const { Component, pageProps } = this.props
    const { menuActive, loggedIn } = this.state

    return (
      <Container>
        <div className={classes.container}>
          <Navigation
            menuActive={menuActive}
            handleBurgerMenu={this.handleBurgerMenu}
            logo={true}
            burger={true}
            responsive={false}
            loggedIn={loggedIn}
          />
          <Component {...pageProps} loggedIn={loggedIn} />
        </div>
        <Footer />
        <SideMenu menuActive={menuActive}>
          <Navigation
            menuActive={menuActive}
            handleBurgerMenu={this.handleBurgerMenu}
            logo={false}
            burger={false}
            responsive={true}
            loggedIn={loggedIn}
          />
        </SideMenu>
      </Container>
    )
  }
}

export default MyApp
