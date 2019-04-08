import React from 'react'
import { Icon } from 'antd'

const quoraUpvote = ({ className }) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      // xmlns:xlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <g id="upvote" strokeWidth="1.8" fill="none" fillRule="evenodd" strokeLinejoin="round">
        <polygon points="12 4 3 15 9 15 9 20 15 20 15 15 21 15" />
      </g>
    </svg>
  )
}

const UpVote = props => {
  return <Icon className={props.className} component={quoraUpvote} {...props} />
}

export default UpVote
