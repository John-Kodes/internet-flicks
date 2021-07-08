//////// background transition to dark grey when scroll added
import React, { useState } from "react";
// Next
import Link from "next/link";
// styling and animation
import styles from "@/styles/Nav.module.scss";
import BellIcon from "../public/images/BellIcon.js";
import ArrowTiny from "../public/images/ArrowTiny.js";
import SearchIcon from "../public/images/SearchIcon.js";

const Nav = () => {
  const [scrollActive, setScrollActive] = useState(false);

  return (
    <nav className={styles.nav} style={{ backgroundColor: "transparent" }}>
      <div className={styles.nav__info}>
        <Link href="/">
          <div className={styles.nav__logo}>Internet Flicks</div>
        </Link>
        <div className={styles.nav__link__container}>
          <Link href="/browse">
            <div className={styles.nav__link}>Home</div>
          </Link>
          <Link href="/browse/tv-shows">
            <div className={styles.nav__link}>TV Shows</div>
          </Link>
          <Link href="/browse/movies">
            <div className={styles.nav__link}>Movies</div>
          </Link>
          <Link href="/browse/New-And-Popular">
            <div className={styles.nav__link}>New & Popular</div>
          </Link>
          <Link href="/browse/my-list">
            <div className={styles.nav__link}>My List</div>
          </Link>
        </div>
      </div>
      <div className={styles.nav__user}>
        <div className={styles.nav__user__search}>
          <SearchIcon />
        </div>
        <div className={styles.nav__user__notifsIcon}>
          <BellIcon />
          <div className={styles.nav__user__notifsBox}>
            <div className={styles.nav__user__notifsBox__pointer}>
              <ArrowTiny />
            </div>
            No recent notifications
          </div>
        </div>
        <div className={styles.nav__user__accBtn}>
          <div className={styles.nav__user__pfp} />
          <ArrowTiny />
          <div className={styles.nav__user__accBox}>
            <div className={styles.nav__user__accBox__pointer}>
              <ArrowTiny />
            </div>
            <div className={styles.nav__user__accBox__btnsContainer}>
              <button>Account</button>
              <button>Sign Out</button>
              <button>Back to portfolio</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
