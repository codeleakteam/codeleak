import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

import { Tag } from 'antd'

const TagWithLink = ({ color, customClass, text, url }) => {
  return (
    <Link href={url}>
      <Tag color={color} className={customClass}>
        {text}
      </Tag>
    </Link>
  )
}

TagWithLink.propTypes = {
  customClass: PropTypes.string,
  text: PropTypes.string.isRequired,
}
export default TagWithLink
