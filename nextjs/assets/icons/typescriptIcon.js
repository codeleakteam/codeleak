import React from 'react'

const SVG = ({ height, width, className, fill }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 32V64H64.002V-0.00201416H0V32ZM51.577 29.45C53.202 29.856 54.442 30.578 55.58 31.756C56.17 32.386 57.043 33.534 57.114 33.808C57.134 33.888 54.351 35.758 52.664 36.805C52.604 36.845 52.359 36.582 52.084 36.175C51.261 34.975 50.398 34.458 49.077 34.367C47.137 34.235 45.877 35.251 45.897 36.947C45.897 37.445 45.967 37.739 46.171 38.147C46.598 39.031 47.391 39.559 49.879 40.637C54.461 42.607 56.421 43.907 57.639 45.757C58.999 47.819 59.305 51.111 58.381 53.559C57.365 56.221 54.846 58.029 51.301 58.629C50.204 58.822 47.603 58.792 46.425 58.579C43.855 58.122 41.417 56.852 39.913 55.186C39.323 54.536 38.176 52.839 38.247 52.716C38.277 52.676 38.542 52.513 38.837 52.34L41.214 50.97L43.054 49.903L43.44 50.473C43.978 51.296 45.157 52.423 45.868 52.799C47.91 53.876 50.714 53.723 52.095 52.484C52.685 51.946 52.928 51.387 52.928 50.564C52.928 49.822 52.838 49.497 52.451 48.939C51.953 48.229 50.937 47.629 48.051 46.379C44.749 44.957 43.327 44.073 42.027 42.671C41.275 41.858 40.564 40.558 40.269 39.471C40.025 38.567 39.964 36.301 40.157 35.387C40.837 32.187 43.245 29.972 46.72 29.312C47.848 29.099 50.47 29.18 51.576 29.454L51.577 29.45ZM36.552 32.12L36.572 34.74H28.242V58.41H22.35V34.74H14.02V32.17L14.09 29.53C14.12 29.49 19.19 29.47 25.336 29.48L36.521 29.51L36.552 32.12Z"
        fill="#007ACC"
      />
    </svg>
  )
}

export default SVG
