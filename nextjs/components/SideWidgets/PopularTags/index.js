import React, { Component } from 'react'
import TagWithLink from '../../TagWithLink'
import { apiGet } from '../../../api'
import _ from 'lodash'

import classes from './index.scss'

class PopularTags extends Component {
  state = {
    tags: [],
  }

  componentDidMount() {
    this.getPopularTags()
  }

  getPopularTags = async () => {
    try {
      let res = await apiGet.getTags()
      const tags = _.get(res, 'data', [])
      this.setState({ tags })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let popularTags = _.reverse(_.sortBy(this.state.tags, 'used_times')).slice(0, 6)

    return (
      <div className={classes.tags}>
        <h4 className={classes.tags__title}>Popular tags</h4>
        <div className={classes.tag__container}>
          {popularTags.map(tag => {
            return <TagWithLink key={tag.id + tag.slug} customClass={classes.tag} text={tag.title} url="/" />
          })}
        </div>
      </div>
    )
  }
}

export default PopularTags
