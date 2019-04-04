import React from 'react'
import Link from 'next/link'

import classes from './index.scss'

const Logo = props => {
  return (
    <Link href="/">
      <div className={classes.logo}>codeLeak</div>
    </Link>
  )
}

export default Logo
