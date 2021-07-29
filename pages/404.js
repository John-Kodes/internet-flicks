import Link from "next/dist/client/link";

import { FaExclamationTriangle } from "react-icons/fa";

import styles from "@/styles/404.module.scss";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>
        <FaExclamationTriangle /> WHOOPS, 404
      </h1>

      <p>
        This page could not be found. <br />
      </p>
      <Link href="/browse">
        <button className={styles.homeBtn}>Go back home</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
