import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

import classes from './index.scss'

const Logo = ({ type, size }) => {
  return (
    <Link href="/">
      <div className={classes.logo}>
        {type === 'short' ? (
          <span className={classes['logo__blue-side']}>&lt;/&gt;</span>
        ) : (
          <React.Fragment>
            <span style={{ fontSize: `${size}px` }} className={classes['logo__blue-side']}>
              c&lt;/&gt;de
            </span>
            <span style={{ fontSize: `${size}px` }}>Leak</span>
          </React.Fragment>
        )}
      </div>
    </Link>
  )
}

Logo.defaultProps = {
  type: 'full',
}

Logo.propTypes = {
  type: PropTypes.string,
}

export default Logo
