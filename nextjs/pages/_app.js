import React from 'react'
import App, { Container } from 'next/app'
import SideMenu from '../components/SideMenu'
import Navigation from '../components/Navigation'
// import PopularTags from '../components/PopularTags'
import Footer from '../components/Footer'

import TwoSideLayout from '../components/TwoSideLayout'

import classes from '../styles/layout.module.scss'
import '../styles/global.scss'

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

  handleBurgerMenu = () => {
    this.setState((state, props) => ({ menuActive: !state.menuActive }))
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <div className={classes.container}>
          <Navigation
            menuActive={this.state.menuActive}
            handleBurgerMenu={this.handleBurgerMenu}
            logo={true}
            burger={true}
            responsive={false}
            loggedIn={this.state.loggedIn}
          />
          <Component {...pageProps} loggedIn={this.state.loggedIn} />
        </div>

        <Footer />

        <SideMenu menuActive={this.state.menuActive}>
          <Navigation
            menuActive={this.state.menuActive}
            handleBurgerMenu={this.handleBurgerMenu}
            logo={false}
            burger={false}
            responsive={true}
            loggedIn={this.state.loggedIn}
          />
        </SideMenu>
      </Container>
    )
  }
}

export default MyApp
