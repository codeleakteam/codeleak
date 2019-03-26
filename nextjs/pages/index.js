import React, { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import InputWithButton from '../components/InputWithButton'
import BurgerMenu from '../components/BurgerMenu'
import SideMenu from '../components/SideMenu'
import Navigation from '../components/Navigation'

import classes from '../styles/index/index.scss'

class Index extends Component {
  state = {
    menuActive: false,
  }

  handleBurgerMenu = e => {
    this.setState((state, props) => ({ menuActive: !state.menuActive }))
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>codeLeak</title>
        </Head>

        <div className={classes.container}>
          <Navigation
            menuActive={this.state.menuActive}
            handleBurgerMenu={this.handleBurgerMenu}
            logo={true}
            burger={true}
            responsive={false}
          />
          <section className={classes.banner}>
            <div className={classes.banner__desc}>
              <h1 className={classes.banner__heading}>codeLeak</h1>
              <h3 className={classes.banner__text}>
                An online-editor based question and answer platform for front-end developers
              </h3>
              <InputWithButton />
            </div>
            <div className={classes.banner__image}>
              <img src="https://dummyimage.com/300x300/000/fff" />
            </div>
          </section>
        </div>

        <SideMenu menuActive={this.state.menuActive}>
          <Navigation
            menuActive={this.state.menuActive}
            handleBurgerMenu={this.handleBurgerMenu}
            logo={false}
            burger={false}
            responsive={true}
          />
        </SideMenu>
      </React.Fragment>
    )
  }
}

export default Index
