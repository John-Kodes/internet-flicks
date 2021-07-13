import React from "react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import { ContextProvider } from "@/context/Context";
import "@/styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <React.StrictMode>
      <ContextProvider>
        {router.pathname === "/_error" ? (
          <Component {...pageProps} />
        ) : router.pathname === "/" ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ContextProvider>
    </React.StrictMode>
  );
}

export default MyApp;
