import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload custom font */}
        <link
          rel="preload"
          href="/fonts/Whocats.ttf"
          as="font"
          type="font/ttf"
        />
        {/* Font-face declaration */}
        <style>
          {`
            @font-face {
              font-family: 'Whocats';
              src: local('Whocats'), url('/fonts/Whocats.ttf') format('truetype');
            }
          `}
        </style>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
