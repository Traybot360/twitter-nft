import {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
} from "next/document";

interface DocumentProps extends DocumentInitialProps {
  emotionStyleTags: React.ReactNode[];
}

const MyDocument = (props: DocumentProps) => {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oleo+Script+Swash+Caps&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
export default MyDocument;
