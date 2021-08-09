import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// Styles
import styles from "@/styles/PageLoader.module.scss";

const PageLoader = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // splitting so that it will only change if the route changes, not if the queries is updated
    const handleStart = (url) => {
      if (url.includes("title")) {
        url.slice(0, 13) + "/[id]" !== router.pathname && setLoading(true);
      } else url.split("?")[0] !== router.pathname && setLoading(true);
    };
    const handleComplete = (url) =>
      url === router.pathname && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  useEffect(() => {
    if (!document) return;
    document.body.style.overflowY = loading ? "hidden" : "scroll";
  }, [loading]);

  return (
    <>
      {loading && (
        <div className={styles.container}>
          <p className={styles.text}>loading...</p>
          <div className={styles.ldsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default PageLoader;
