const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
module.exports = withCSS(withSass({
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: '[local]___[hash:base64:5]',
  },
}))
