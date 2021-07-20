import Head from "next/head";
import Link from "next/dist/client/link";
// Components
import Layout from "@/components/Layout";
// styles
import styles from "@/styles/Home.module.scss";

export const HomePage = () => {
  return (
    <Layout useNav={false}>
      <div className={styles.container}>
        <Link href="/browse">
          <a>Visit as Guest</a>
        </Link>
      </div>
    </Layout>
  );
};
// What's popular
// Trending
// Upcoming
// Genres

export default HomePage;
