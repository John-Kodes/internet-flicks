import Link from "next/dist/client/link";
import { useContext } from "react";
// Context
import Context from "@/context/Context";
// Components
import Layout from "@/components/Layout";
// styles
import styles from "@/styles/Home.module.scss";

export const HomePage = () => {
  const { createGuestSessionId } = useContext(Context);
  return (
    <Layout useNav={false}>
      <div className={styles.container}>
        <a onClick={createGuestSessionId}>Visit as Guest</a>
        <Link href="/account/login">
          <a>Sign in to your account</a>
        </Link>
      </div>
    </Layout>
  );
};

export default HomePage;
