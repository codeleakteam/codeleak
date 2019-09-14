import React, { Component } from 'react'
import { apiGet } from '../api'
import _ from 'lodash'
import styled from 'styled-components'
import PropTypes from 'prop-types'

class TagList extends Component {
  static async getInitialProps() {
    try {
      const res = await apiGet.getTagList()
      const tags = _.get(res, 'data.tags', null)
      if (!tags) throw new Error('No tags available')
      return {
        tags,
      }
    } catch (err) {
      console.error('[getInitialProps]', { err })
    }
  }
  render() {
    let { tags } = this.props

    return (
      <div>
        <CardGrid>
          {tags.map(t => (
            <TagCard key={t.id}>
              <TagName>{t.title}</TagName>
              <p>{t.description}</p>
            </TagCard>
          ))}
        </CardGrid>
      </div>
    )
  }
}

const TagName = styled.h3`
  margin-bottom: 0;
`
const CardGrid = styled.div`
  background: white;
  display: flex;
  flex-wrap: wrap;
`
const TagCard = styled.div`
  box-shadow: 1px 0 0 0 #e8e8e8, 0 1px 0 0 #e8e8e8, 1px 1px 0 0 #e8e8e8, 1px 0 0 0 #e8e8e8 inset,
    0 1px 0 0 #e8e8e8 inset;
  padding: 8px;
  text-align: center;
  width: 20%;
  @media screen and (max-width: 745px) {
    width: 33%;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    text-align: left;
  }
`

TagList.propTypes = {
  tags: PropTypes.array.isRequired,
}

export default TagList
