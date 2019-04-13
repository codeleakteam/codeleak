const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')

const nextConfig = {
  publicRuntimeConfig: {
    baseUrl: 'http://localhost:8000',
  },
}

module.exports = withPlugins(
  [
    withCSS(
      withSass({
        cssModules: true,
        cssLoaderOptions: {
          localIdentName: '[local]___[hash:base64:5]',
        },
      })
    ),
  ],
  nextConfig
)
