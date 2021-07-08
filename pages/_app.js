import React from "react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import "@/styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <React.StrictMode>
      {router.pathname !== "/" ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </React.StrictMode>
  );
}

export default MyApp;
