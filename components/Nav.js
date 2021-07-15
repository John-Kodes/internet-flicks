// Next
import Link from "next/link";
// styling
import styles from "@/styles/Nav.module.scss";
// Icons
import BellIcon from "@/images/BellIcon.js";
import ArrowTiny from "@/images/ArrowTiny.js";
import SearchIcon from "@/images/SearchIcon.js";

const Nav = ({ inView = true, category }) => {
  return (
    <nav
      className={styles.nav}
      style={{
        backgroundColor: inView ? "transparent" : "var(--pageBg100)",
        top: !category && "0",
        position: category && "sticky",
      }}
    >
      <div className={styles.navContainer}>
        <div className={styles.info}>
          <Link href="/">
            <div className={styles.logo}>Internet Flicks</div>
          </Link>
          <div className={styles.linkContainer}>
            <Link href="/browse">
              <div className={styles.link}>Home</div>
            </Link>
            <Link href="/browse/tv-shows">
              <div className={styles.link}>TV Shows</div>
            </Link>
            <Link href="/browse/movies">
              <div className={styles.link}>Movies</div>
            </Link>
            <Link href="/browse/New-And-Popular">
              <div className={styles.link}>New & Popular</div>
            </Link>
            <Link href="/browse/my-list">
              <div className={styles.link}>My List</div>
            </Link>
          </div>
        </div>
        <div className={styles.user}>
          <div className={styles.search}>
            <SearchIcon />
          </div>
          <div className={styles.notifsIcon}>
            <BellIcon />
            <div className={styles.notifsBox}>
              <div className={styles.pointer}>
                <ArrowTiny />
              </div>
              No recent notifications
            </div>
          </div>
          <div className={styles.accBtn}>
            <div className={styles.pfp} />
            <ArrowTiny />
            <div className={styles.accBox}>
              <div className={styles.pointer}>
                <ArrowTiny />
              </div>
              <div className={styles.btnsContainer}>
                <button>Account</button>
                <button>Sign Out</button>
                <button>Back to portfolio</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {category && (
        <div className={styles.category}>
          <h2>{category}</h2>
        </div>
      )}
    </nav>
  );
};

export default Nav;
