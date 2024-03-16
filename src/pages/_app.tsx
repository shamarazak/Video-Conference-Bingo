import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

const HeadComponent = () => (
  <Head>
    <title>BINGO</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
  </Head>
);
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadComponent />
      <Component {...pageProps} />
    </>
  );
}
