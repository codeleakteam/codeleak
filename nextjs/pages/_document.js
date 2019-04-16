import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Check if in production
    // const isProduction = process.env.NODE_ENV === 'production'
    const isProduction = true
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
          <link href="https://fonts.googleapis.com/css?family=Karla:400,700" rel="stylesheet" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.11.2/antd.css" rel="stylesheet" />

          <link rel="icon" type="image/png" sizes="32x32" href="../static/favicons/favicon32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="../static/favicons/favicon16.png" />
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
