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
  const [open, setOpen] = useState(false);

  const mouseEnter = () => {
    setOpen(true);
  };

  const mouseLeave = () => {
    setOpen(false);
  };

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
        <div
          className={classes.nav__user__notifsContainer}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
        >
          <BellIcon />
          <DropDownMenu open={open} />
        </div>
        <div className={classes.nav__user__accountBtn}>
          <div className={classes.nav__user__pfp}></div>
          <ArrowTiny />
        </div>
      </div>
    </nav>
  );
};

const DropDownMenu = ({ open }) => {
  return (
    <div
      className={classes.nav__user__notifsBox}
      style={{ display: open ? "flex" : "none" }}
    >
      <div className={classes.nav__user__notifsBox__pointer}>
        <ArrowTiny />
      </div>
      No recent notifications
    </div>
  );
};

export default Nav;
