import React from "react";
import { useRouter } from "next/router";

import { ContextProvider } from "@/context/Context";
import "@/styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <React.StrictMode>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </React.StrictMode>
  );
}

export default MyApp;
