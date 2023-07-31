import BaseLayout from "@components/Layouts/BaseLayout";
import { defaultSEO } from "@utils/config";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = (Component as any).Layout || BaseLayout;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Toaster />
      <NextSeo {...defaultSEO} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
