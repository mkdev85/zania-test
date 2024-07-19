import React from "react";

import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { PageLoader } from "@cat/ui-kit/PageLoader/PageLoader";

const HomePage = dynamic(
  () =>
    import("@cat/containers/home-page/HomePage").then((mod) => mod.HomePage),
  {
    ssr: false,
    loading: () => <PageLoader />,
  }
);

const Home: NextPage = (props) => {
  return (
    <>
      <Head>
        <title key="title">Cat Album</title>
        <meta name="description" content="This is Cat Album" />
        <meta property="og:title" content="Cat Album" />
        <meta property="og:description" content="This is Cat Album" />
        <meta property="og:type" content="website" />
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
