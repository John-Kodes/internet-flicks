//////// background transition to dark grey when scroll added
// Next
import Link from "next/link";
// styling and animation
import classes from "./Nav.module.scss";

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
    </nav>
  );
};

export default Nav;
