import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// Styles
import styles from "@/styles/PageLoader.module.scss";

const PageLoader = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  console.log(router.route);

  useEffect(() => {
    const handleStart = (url) => url !== router.pathname && setLoading(true);
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
