import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: 'https://66e6fd9fe82e42f1b636c99f0e5cc527@sentry.io/1510922',
})

process.on('unhandledRejection', err => {
  console.error('_document.unhandledRejection', err)
  Sentry.captureException(err)
})

process.on('uncaughtException', err => {
  console.error('_document.unhandledRejection', err)
  Sentry.captureException(err)
})

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const isProduction = publicRuntimeConfig.baseUrl === 'http://codeleak.io' ? true : false
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        isProduction,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  setGoogleTags() {
    return {
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-138467146-1');
      `,
    }
  }

  render() {
    const { isProduction } = this.props
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
          {/* antd */}
          <link href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.11.2/antd.css" rel="stylesheet" />
          {/* icons */}
          <link rel="apple-touch-icon" sizes="57x57" href="../../static/favicons/favicon57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="../../static/favicons/favicon60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="../../static/favicons/favicon72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="../../static/favicons/favicon76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="../../static/favicons/favicon114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="../../static/favicons/favicon120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="../../static/favicons/favicon144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="../../static/favicons/favicon152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="../../static/favicons/favicon180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="../../static/favicons/favicon192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="../../static/favicons/favicon32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="../../static/favicons/favicon96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="../../static/favicons/favicon16x16.png" />
          <meta name="msapplication-TileImage" content="../../static/favicons/favicon144x144.png" />
          {/* metas */}
          <meta
            name="description"
            content="Better experience of asking and answering code-related questions. Place where developers debug code together, share knowledge, and learn."
          />
          {/* <link href="../../static/css/draftjs.css" rel="stylesheet" /> */}
          {/* {process.env.NODE_ENV == 'production' && (
            <link rel="stylesheet" type="text/css" href={'/_next/static/css/styles.chunk.css?v=' + Date.now()} />
          )} */}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-138467146-1" />
          {/* We call the function above to inject the contents of the script tag */}
          <script dangerouslySetInnerHTML={this.setGoogleTags()} />
        </body>
      </Html>
    )
  }
}

export default MyDocument
