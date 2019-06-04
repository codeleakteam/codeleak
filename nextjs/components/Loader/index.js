import React from 'react'
import { Spin } from 'antd'

import classes from './index.scss'

const Loader = props => {
  return (
    <div className={classes.loader}>
      <Spin />
    </div>
  )
}

export default Loader
