import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.StrictMode>
  );
}

export default MyApp;
