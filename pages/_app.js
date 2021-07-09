import React from "react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import { ContextProvider } from "context/Context";
import "@/styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <React.StrictMode>
      <ContextProvider>
        {router.pathname !== "/" ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : router.pathname !== "/_error" ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </ContextProvider>
    </React.StrictMode>
  );
}

export default MyApp;
