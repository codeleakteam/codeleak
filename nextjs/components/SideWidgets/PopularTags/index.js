import React from 'react'
import TagWithLink from '../../TagWithLink'

import classes from './index.scss'

const PopularTags = props => {
  console.log(props)

  return (
    <div className={classes.container}>
      {/* {props.tagList.map(tag => {
        return <TagWithLink customClass={classes.tag} text={tag.title} url="/" />
      })} */}
    </div>
  )
}

export default PopularTags
