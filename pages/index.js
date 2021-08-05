import Link from "next/dist/client/link";
import { useContext } from "react";
import cookie from "cookie";
// Context
import Context from "@/context/Context";
// Components
import Layout from "@/components/Layout";
// styles
import styles from "@/styles/Home.module.scss";

export const HomePage = ({ isLoggedIn }) => {
  const { createGuestSessionId } = useContext(Context);

  return (
    <Layout useNav={false}>
      <div className={styles.container}>
        {isLoggedIn ? (
          <div className={styles.loginBox}>
            <Link href="/browse">
              <a className={styles.btnFill}>Go back to browsing</a>
            </Link>
            <div className={styles.loginMessage}>You're already logged in!</div>
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
