import Document, { Head, Main, NextScript, Html } from "next/document";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html style={{ margin: 0 }}>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body style={{ margin: 0 }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
