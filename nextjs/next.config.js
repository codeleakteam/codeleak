const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')

// Webpack config for images in css
// https://whoisryosuke.com/blog/2018/nextjs-tip-using-media-in-css/

const nextConfig = {
  publicRuntimeConfig: {
    baseUrl: 'http://localhost:8000',
  },
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
