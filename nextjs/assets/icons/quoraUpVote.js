import React from 'react'

const SVG = ({ height, className, fill, strokeWidth, strokeColor }) => {
  return (
    <svg width={height} height={height} viewBox="0 0 24 24" className={className}>
      <g
        id="upvote"
        strokeWidth={strokeWidth}
        stroke={strokeColor}
        fill={fill}
        fillRule="evenodd"
        strokeLinejoin="round"
      >
        <polygon points="12 4 3 15 9 15 9 20 15 20 15 15 21 15" />
      </g>
    </svg>
  )
}

SVG.defaultProps = {
  fill: 'white',
  strokeWidth: 1.8,
  strokeColor: '#111',
}
export default SVG
