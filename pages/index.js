import Link from "next/dist/client/link";
import Image from "next/dist/client/image";
import { useContext } from "react";
import cookie from "cookie";
// Context
import Context from "@/context/Context";
// Components
import Layout from "@/components/Layout";
// Images
import bgImg from "@/images/bgImg.jpg";
// styles
import styles from "@/styles/Home.module.scss";

export const HomePage = ({ isLoggedIn }) => {
  const { createGuestSessionId } = useContext(Context);

  return (
    <Layout useNav={false}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            src={bgImg}
            layout="fill"
            objectFit="cover"
            objectPosition="left"
          />
        </div>
        <div className={styles.btnContainer}>
          {isLoggedIn ? (
            <div className={styles.loginBox}>
              <Link href="/browse">
                <a className={styles.btnFill}>Go back to browsing</a>
              </Link>
              <div className={styles.loginMessage}>
                You're already logged in!
              </div>
            </div>
          ) : (
            <Link href="/account/login">
              <a className={styles.btnFill}>Sign in to your account</a>
            </Link>
          )}
          <a onClick={createGuestSessionId} className={styles.btnGhost}>
            Visit as Guest
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

export const getServerSideProps = ({ req }) => {
  const { accountId } = cookie.parse(req.headers.cookie || "");

  return {
    props: {
      isLoggedIn: Boolean(accountId),
    },
  };
};
