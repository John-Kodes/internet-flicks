import Link from "next/dist/client/link";
// Styles
import styles from "@/styles/NavDecor.module.scss";

const NavDecor = () => {
  return (
    <div className={styles.nav}>
      <Link href="/">
        <div className={styles.logo}>Internet Flicks</div>
      </Link>
    </div>
  );
};

export default NavDecor;
