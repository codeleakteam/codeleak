import React from 'react'

const SVG = ({ height, width, className, fill }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_i)">
        <path d="M0.628052 0.314087H63.4346V63.1207H0.628052V0.314087Z" fill="black" />
      </g>
      <path d="M0.628052 0.314087H63.4346V63.1207H0.628052V0.314087Z" fill="#DD4B39" />
      <path d="M0.774658 0.459106H63.2902V62.9731H0.774658V0.459106Z" stroke="#D74837" strokeWidth="0.185" />
      <path
        d="M37.884 57.5961H30.7816L27.2819 50.9397H22.6156V57.5961H16.3367V33.544H27.1446C33.5265 33.544 37.1635 36.632 37.1635 41.9846C37.1635 45.6215 35.6538 48.2978 32.8746 49.7388L37.884 57.5961ZM22.6185 38.5505V45.9274H27.1819C29.7209 45.9274 31.1962 44.6236 31.1962 42.1875C31.1962 39.8201 29.7209 38.5505 27.1819 38.5505H22.6185ZM41.1807 33.5411H60.1489V38.5505H47.4538V43.0453H58.9137V48.0175L47.4538 48.0518V52.5808H60.492V57.5961H41.1749L41.1807 33.5411Z"
        fill="white"
      />
      <g filter="url(#filter1_i)">
        <path
          d="M37.884 57.5961H30.7816L27.2819 50.9397H22.6156V57.5961H16.3367V33.544H27.1446C33.5265 33.544 37.1635 36.632 37.1635 41.9846C37.1635 45.6215 35.6538 48.2978 32.8746 49.7388L37.884 57.5961ZM22.6185 38.5505V45.9274H27.1819C29.7209 45.9274 31.1962 44.6236 31.1962 42.1875C31.1962 39.8201 29.7209 38.5505 27.1819 38.5505H22.6185ZM41.1807 33.5411H60.1489V38.5505H47.4538V43.0453H58.9137V48.0175L47.4538 48.0518V52.5808H60.492V57.5961H41.1749L41.1807 33.5411Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_i"
          x="0.628052"
          y="0.314087"
          width="62.8066"
          height="64.8066"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>
        <filter
          id="filter1_i"
          x="16.3367"
          y="33.5411"
          width="44.1554"
          height="26.0549"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>
      </defs>
    </svg>
  )
}

export default SVG
