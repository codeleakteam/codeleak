import React from 'react'

const SVG = ({ height, width, className, fill }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 94 112" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M87.2535 14.8189C76.8535 -0.0662155 56.3135 -4.47821 41.4621 4.98409L15.3794 21.6078C11.8559 23.8245 8.83366 26.752 6.5059 30.2032C4.17814 33.6543 2.59606 37.5532 1.86081 41.6506C0.616612 48.5524 1.71019 55.6721 4.96841 61.8824C2.73579 65.2691 1.21305 69.0734 0.492215 73.0653C-0.250831 77.2452 -0.151746 81.5314 0.783656 85.6725C1.71906 89.8136 3.47195 93.7263 5.93951 97.181C16.3417 112.067 36.8818 116.478 51.7309 107.016L77.8136 90.3921C81.3374 88.1756 84.3598 85.2482 86.6876 81.797C89.0154 78.3458 90.5973 74.4468 91.3322 70.3493C92.5763 63.4475 91.4835 56.328 88.2269 50.117C90.459 46.7303 91.9811 42.9262 92.7012 38.9346C93.4447 34.7547 93.3459 30.4684 92.4105 26.3272C91.4751 22.186 89.7219 18.2734 87.2539 14.8189"
        fill="#FF3E00"
      />
      <path
        d="M38.914 98.5815C34.8094 99.6488 30.4761 99.4307 26.4994 97.9566C22.5227 96.4826 19.0942 93.8236 16.6769 90.3389C15.1927 88.2615 14.1383 85.9085 13.5757 83.4182C13.013 80.9278 12.9534 78.3501 13.4003 75.8364C13.5516 75.0111 13.7599 74.1972 14.0236 73.4007L14.5148 71.9029L15.8511 72.8844C18.9372 75.152 22.3877 76.876 26.0541 77.9822L27.0235 78.2763L26.9342 79.2438C26.8157 80.6202 27.1884 81.9941 27.9862 83.1219C28.7137 84.1716 29.7457 84.9727 30.9431 85.4171C32.1404 85.8615 33.4452 85.9277 34.6814 85.6069C35.2482 85.4554 35.7885 85.2179 36.2835 84.9028L62.3669 68.281C63.0051 67.8791 63.5526 67.3487 63.9745 66.7235C64.3965 66.0984 64.6835 65.3922 64.8175 64.65C64.9513 63.8923 64.9329 63.1156 64.7634 62.3651C64.5938 61.6146 64.2765 60.9054 63.83 60.2788C63.1021 59.2289 62.0696 58.4275 60.8719 57.9829C59.6741 57.5383 58.3689 57.4718 57.1322 57.7924C56.5661 57.9439 56.0265 58.1812 55.5322 58.496L45.579 64.8409C43.9423 65.8815 42.1562 66.6659 40.2825 67.1668C36.1779 68.234 31.8447 68.0158 27.8681 66.5418C23.8914 65.0677 20.4629 62.4088 18.0457 58.9241C16.5614 56.8467 15.507 54.4938 14.9444 52.0034C14.3817 49.5131 14.3221 46.9354 14.7691 44.4217C15.2111 41.9578 16.1625 39.6133 17.5625 37.5382C18.9624 35.4631 20.78 33.7029 22.8991 32.3704L48.9802 15.7472C50.6176 14.7049 52.405 13.9195 54.2802 13.4185C58.3847 12.3513 62.7179 12.5695 66.6945 14.0435C70.6711 15.5175 74.0996 18.1764 76.5169 21.6611C78.0011 23.7385 79.0554 26.0914 79.6181 28.5818C80.1808 31.0722 80.2404 33.6499 79.7935 36.1636C79.6415 36.9888 79.4332 37.8026 79.1702 38.5993L78.679 40.0971L77.3434 39.1171C74.2575 36.8482 70.8066 35.1234 67.1397 34.0171L66.1703 33.7229L66.2596 32.7554C66.377 31.3791 66.0044 30.0056 65.2076 28.8774C64.4801 27.8277 63.448 27.0266 62.2507 26.5822C61.0534 26.1378 59.7485 26.0715 58.5124 26.3924C57.9455 26.5439 57.4052 26.7814 56.9103 27.0965L30.8269 43.719C30.1888 44.1205 29.6414 44.6508 29.2198 45.2758C28.7982 45.9008 28.5115 46.6069 28.3782 47.349C28.2435 48.1066 28.2613 48.8835 28.4306 49.6341C28.5998 50.3848 28.9171 51.0941 29.3638 51.7207C30.0917 52.7706 31.1242 53.5719 32.3219 54.0165C33.5196 54.4612 34.8249 54.5277 36.0616 54.2071C36.6283 54.0553 37.1685 53.8178 37.6636 53.503L47.6155 47.1605C49.2515 46.1185 51.0375 45.3334 52.9114 44.8327C57.0159 43.7655 61.3492 43.9836 65.3258 45.4577C69.3024 46.9317 72.7309 49.5907 75.1482 53.0754C76.6324 55.1528 77.6868 57.5057 78.2495 59.996C78.8122 62.4864 78.8718 65.0641 78.4248 67.5778C77.9824 70.0418 77.0309 72.3864 75.631 74.4619C74.2311 76.5373 72.4137 78.2978 70.2948 79.631L44.2136 96.2528C42.5762 97.2951 40.7888 98.0805 38.9136 98.5815"
        fill="white"
      />
    </svg>
  )
}

export default SVG