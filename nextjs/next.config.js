const withSass = require('@zeit/next-sass')
module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: '[local]___[hash:base64:5]',
  },
})
