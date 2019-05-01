import React, { Component } from 'react'
import Head from 'next/head'
import InputWithButton from '../../components/InputWithButton'
import Logo from '../../components/Logo'

// import classes from '../styles/landing/index.scss'

const Landing = () => {
  return (
    <div>
      <Head>
        <title>codeLeak</title>
      </Head>
      <section className={classes.banner}>
        <div className={classes.banner__desc}>
          <Logo size={42} className={classes.banner__logo} />
          <h3 className={classes.banner__text}>
            An online-editor based question and answer platform for front-end developers
          </h3>
          <InputWithButton />
        </div>
      </section>
    </div>
  )
}

export default Landing
