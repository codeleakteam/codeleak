import React from 'react'
import { Input, Button } from 'antd';

import classes from './index.scss';

const UrlTab = ({ url, handleUrlChange, onAddLink }) => {
  return (
    <div className={classes.url__container}>
      <Input className={classes.url__input} value={url} onChange={handleUrlChange} size="small" />
      <Button onClick={onAddLink} size="small">
        ADD LINK
      </Button>
    </div>
  )
}

export default UrlTab