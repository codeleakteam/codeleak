import Document, { Html, Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Check if in production
    const isProduction = publicRuntimeConfig.baseUrl === 'http://codeleak.io' ? true : false
    const initialProps = await Document.getInitialProps(ctx)
    // Pass isProduction flag back through props
    return { ...initialProps, isProduction }
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
          {/* google font */}
          <link href="https://fonts.googleapis.com/css?family=Karla:400,700" rel="stylesheet" />
          {/* antd */}
          <link href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.11.2/antd.css" rel="stylesheet" />
          {/* icons */}
          <link rel="apple-touch-icon" sizes="57x57" href="../static/favicons/favicon57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="../static/favicons/favicon60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="../static/favicons/favicon72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="../static/favicons/favicon76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="../static/favicons/favicon114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="../static/favicons/favicon120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="../static/favicons/favicon144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="../static/favicons/favicon152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="../static/favicons/favicon180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="../static/favicons/favicon192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="../static/favicons/favicon32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="../static/favicons/favicon96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="../static/favicons/favicon16x16.png" />
          <meta name="msapplication-TileImage" content="../static/favicons/favicon144x144.png" />
          {/* metas */}
          <meta
            name="description"
            content="An online-editor based question and answer platform for front-end developers"
          />

          {/* {process.env.NODE_ENV == 'production' && (
            <link rel="stylesheet" type="text/css" href={'/_next/static/css/styles.chunk.css?v=' + Date.now()} />
          )} */}
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* We only want to add the scripts if in production */}
          {isProduction && (
            <React.Fragment>
              <script async src="https://www.googletagmanager.com/gtag/js?id=UA-138467146-1" />
              {/* We call the function above to inject the contents of the script tag */}
              <script dangerouslySetInnerHTML={this.setGoogleTags()} />
            </React.Fragment>
          )}
        </body>
      </Html>
    )
  }
}

export default MyDocument
