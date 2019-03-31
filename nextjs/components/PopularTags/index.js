import React from 'react'
import TagWithLink from '../TagWithLink'

import classes from './index.scss'

const PopularTags = props => {
  return (
    <div className={classes.container}>
      <TagWithLink customClass={classes.tag} text="test" url="/" />
      <TagWithLink customClass={classes.tag} text="test" url="/" />
      <TagWithLink customClass={classes.tag} text="test" url="/" />
      <TagWithLink customClass={classes.tag} text="test" url="/" />
      <TagWithLink customClass={classes.tag} text="test" url="/" />
      <TagWithLink customClass={classes.tag} text="test" url="/" />
    </div>
  )
}

export default PopularTags
