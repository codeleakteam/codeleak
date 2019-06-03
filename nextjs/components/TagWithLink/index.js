import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

import { Tag } from 'antd'

const TagWithLink = ({ color, customClass, text, url, style }) => {
  return (
    <Link href={url}>
      <Tag color={color} className={customClass} style={style}>
        {text}
      </Tag>
    </Link>
  )
}

TagWithLink.propTypes = {
  customClass: PropTypes.string,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  style: PropTypes.object,
}
export default TagWithLink
