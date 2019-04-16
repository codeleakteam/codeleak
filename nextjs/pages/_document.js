import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
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
        </body>
      </Html>
    )
  }
}

export default MyDocument
