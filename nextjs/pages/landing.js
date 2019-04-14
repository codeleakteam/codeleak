import React, { Component } from 'react'
import Link from 'next/link'
import Head from 'next/link'
import InputWithButton from '../components/InputWithButton'
import Logo from '../components/Logo'

import classes from '../styles/landing/index.scss'

class Landing extends Component {
  render() {
    return (
      <React.Fragment>
        <section className={classes.banner}>
          <div className={classes.banner__desc}>
            {/*<h1 className={classes.banner__heading}>codeLeak</h1> */}
            <Logo size={42} />

            <h3 className={classes.banner__text}>
              An online-editor based question and answer platform for front-end developers
            </h3>
            <InputWithButton />
          </div>
          {/*<div className={classes.banner__image}>
            <img src="https://dummyimage.com/300x300/000/fff" />
          </div>
    */}
        </section>
      </React.Fragment>
    )
  }
}

export default Landing
