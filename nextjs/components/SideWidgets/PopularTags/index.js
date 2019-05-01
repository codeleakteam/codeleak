import React from 'react'
import TagWithLink from '../../TagWithLink'

import classes from './index.scss'

const PopularTags = props => {
  return (
    <div className={classes.tag__container}>
      {props.tagList.map(tag => {
        return <TagWithLink key={tag.id + tag.slug} customClass={classes.tag} text={tag.title} url="/" />
      })}
    </div>
  )
}

export default PopularTags
