const withSourceMaps = require('@zeit/next-source-maps')()

// Webpack config for images in css
// https://whoisryosuke.com/blog/2018/nextjs-tip-using-media-in-css/

const isProduction = process.env.CODE_ENV === 'production'

const developmentConfig = {
  baseUrl: 'http://localhost:8000',
}
const productionConfig = {
  baseUrl: 'https://api.codeleak.io',
}

module.exports = withSourceMaps({
  webpack(config, options) {
    return config
  },
  publicRuntimeConfig: isProduction ? productionConfig : developmentConfig,
})
