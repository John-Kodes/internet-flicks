//////// background transition to dark grey when scroll added
import React, { useEffect, useState } from "react";
// Next
import Link from "next/link";
// styling and animation
import classes from "./Nav.module.scss";
import BellIcon from "../img/BellIcon.js";
import ArrowTiny from "../img/ArrowTiny.js";
import SearchIcon from "../img/SearchIcon.js";

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.nav__info}>
        <Link href="/">
          <div className={classes.nav__logo}>Internet Flicks</div>
        </Link>

        <Link href="/">
          <div className={classes.nav__link}>Home</div>
        </Link>
        <Link href="/">
          <div className={classes.nav__link}>TV Shows</div>
        </Link>
        <Link href="/">
          <div className={classes.nav__link}>Movies</div>
        </Link>
        <Link href="/">
          <div className={classes.nav__link}>New & Popular</div>
        </Link>
        <Link href="/">
          <div className={classes.nav__link}>My List</div>
        </Link>
      </div>
      <div className={classes.nav__user__buttons}>
        <div className={classes.nav__user__search}>
          <SearchIcon />
        </div>
        <div className={classes.nav__user__notifsIcon}>
          <BellIcon />
          <div className={classes.nav__user__notifsBox}>
            <div className={classes.nav__user__notifsBox__pointer}>
              <ArrowTiny />
            </div>
            No recent notifications
          </div>
        </div>
        <div className={classes.nav__user__accBtn}>
          <div className={classes.nav__user__pfp} />
          <ArrowTiny />
          <div className={classes.nav__user__accBox}>
            <div className={classes.nav__user__accBox__pointer}>
              <ArrowTiny />
            </div>
            Account Settings
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
