import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import InputWithButton from '../components/InputWithButton'

import '../styles/index/index.scss'

const Index = props => {
  return (
    <React.Fragment>
      <Head>
        <title>Codeile</title>
      </Head>
      <div className="container">
        <nav className="navigation">
          <div className="navigation__logo">
            <img src="https://dummyimage.com/50x50/000/fff" />
          </div>
          <ul className="navigation__list">
            <li className="navigation__list-item">
              <Link href="/">
                <a className="navigation__link">Blog</a>
              </Link>
            </li>
            <li className="navigation__list-item">
              <Link href="/">
                <a className="navigation__link navigation__link--active">Get early access</a>
              </Link>
            </li>
          </ul>
        </nav>
        <section className="banner">
          <div className="banner__desc">
            <h1 className="banner__heading">Codeile</h1>
            <h3 className="banner__text">
              An online-editor based question and answer platform for front-end developers
            </h3>
            <InputWithButton />
          </div>
          <div className="banner__image">
            <img src="https://dummyimage.com/300x300/000/fff" />
          </div>
        </section>
      </div>
    </React.Fragment>
  )
}

export default Index
