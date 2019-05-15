import React from 'react'
import { Spin } from 'antd'

import classes from './index.scss'

const Loader = props => {
  return (
    <div>
      <Spin />
    </div>
  )
}

export default Loader
