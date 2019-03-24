import React from 'react'
import Link from 'next/link'

import InputWithButton from '../components/InputWithButton'

import '../styles/index/index.scss'

const Index = props => {
    return (
        <div className="container">
            <nav className="navigation">
                <div className="navigation__logo">
                    <img src="https://dummyimage.com/50x50/000/fff" />
                </div>
                <ul className="navigation__links">
                    <li className="navigation__link">
                        <Link href="/">
                            <a>Blog</a>
                        </Link>
                    </li>
                    <li className="navigation__link">
                        <Link href="/">
                            <a>Get early access</a>
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
    )
}

export default Index
