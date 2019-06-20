// const withSass = require('@zeit/next-sass')
// const withCSS = require('@zeit/next-css')
// const withPlugins = require('next-compose-plugins')

// Webpack config for images in css
// https://whoisryosuke.com/blog/2018/nextjs-tip-using-media-in-css/

const isProduction = process.env.CODE_ENV === 'production'

const developmentConfig = {
  baseUrl: 'http://localhost:8000',
}
const productionConfig = {
  baseUrl: 'http://142.93.14.233',
}

const nextConfig = {
  publicRuntimeConfig: isProduction ? productionConfig : developmentConfig,
}

module.exports = nextConfig
