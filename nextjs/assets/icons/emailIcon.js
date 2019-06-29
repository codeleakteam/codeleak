import React from 'react'

const SVG = ({ height, className, fill }) => {
	return (
		<svg height={height} className={className} viewBox="0 0 24 24">
			<path fill="none" d="M0 0h24v24H0V0z"></path>
			<path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path>
		</svg>
	)
}

export default SVG
