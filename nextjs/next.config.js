const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')

// Webpack config for images in css
// https://whoisryosuke.com/blog/2018/nextjs-tip-using-media-in-css/

const isProduction = process.env.NODE_ENV === 'production'

const developmentConfig = {
  baseUrl: 'http://localhost:8000',
}
const productionConfig = {
  baseUrl: 'http://142.93.14.233',
}

const nextConfig = {
  publicRuntimeConfig: isProduction ? productionConfig : developmentConfig,
}

module.exports = withPlugins(
  [
    withCSS(
      withSass({
        webpack(config, options) {
          config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 100000,
              },
            },
          })

          return config
        },
        cssModules: true,
        cssLoaderOptions: {
          localIdentName: '[local]___[hash:base64:5]',
        },
      })
    ),
  ],
  nextConfig
)
