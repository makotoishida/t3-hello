import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { emotionCache } from "../utils/emotion-cache";

const getInitialProps = createGetInitialProps(emotionCache);

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
