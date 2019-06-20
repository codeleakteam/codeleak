import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import { Tag } from 'antd'

const TagWithLink = ({ color, text, url, style }) => {
  return (
    <Link href={url}>
      <StyledAntTag color={color} style={style}>
        {text}
      </StyledAntTag>
    </Link>
  )
}

TagWithLink.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  style: PropTypes.object,
}

const StyledAntTag = styled(Tag)`
  margin: 4px 0;
  text-align: center;
  padding: 0 5px;
  border: 1px solid #e0e0e0;
  background: #e6e8ed;
  color: #000;
  @media screen and (max-width: 745px) {
    width: 45%;
  }
`
export default TagWithLink
