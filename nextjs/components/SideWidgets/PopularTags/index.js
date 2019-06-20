import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TagWithLink from '../../TagWithLink'
import _ from 'lodash'

const PopularTags = ({ tags }) => {
  const popularTags = _.reverse(_.sortBy(tags, 'used_times')).slice(0, 6)
  return (
    <Wrapper>
      <Title>Popular tags</Title>
      <List>
        {popularTags.map(tag => {
          return <TagWithLink key={tag.id + tag.slug} text={tag.title} url="/" />
        })}
      </List>
    </Wrapper>
  )
}

PopularTags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
}

const Wrapper = styled.div`
  background: white;
  padding: 0.9rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`

const Title = styled.h4`
  color: #000;
  font-weight: bold;
  font-size: 20px;
`

const List = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 4px;
  border-radius: 4px;
`
export default PopularTags
