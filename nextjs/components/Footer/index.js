import React from 'react'
import Link from 'next/link'
import Logo from '../Logo'

import classes from './index.scss'

const Footer = props => {
  let copyrightDate = new Date().getFullYear()
  return (
    <div className={classes.footer__container}>
      <footer className={classes.footer}>
        <ul>
          <li>
            <Logo />
          </li>
          <li>codeLeak &copy; {copyrightDate}</li>
        </ul>
        <ul>
          <li>codeLeak</li>
          <li>
            <Link href="/">
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Contact</a>
            </Link>
          </li>
        </ul>
        <ul>
          <li>developers</li>
          <li>
            <Link href="/">
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Jobs</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Tags</a>
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  )
}

export default Footer
