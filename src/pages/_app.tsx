import { useOnMount } from "@cat/hooks/useOnMount";
import { bootStrap } from "@cat/lib/bootStrap";
import "@cat/styles/globals.css";
import { PageLoader } from "@cat/ui-kit/PageLoader/PageLoader";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isBootstraped, setIsBootstraped] = useState<boolean>(false);

  useOnMount(() => {
    bootStrap().then(() => {
      setIsBootstraped(true);
    });
  });

  if (!isBootstraped) {
    return <PageLoader />;
  }

  return <Component {...pageProps} />;
}
