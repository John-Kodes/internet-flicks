// Next and React
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/dist/client/image";
// Context
import Context from "@/context/Context";
// styling
import styles from "@/styles/Nav.module.scss";
// Icons
import BellIcon from "@/images/BellIcon.js";
import ArrowTiny from "@/images/ArrowTiny.js";
import SearchIcon from "@/images/SearchIcon.js";
import GuestPfp from "@/images/GuestPfp.svg";
import UserPfp from "@/images/UserPfp.svg";
import { PORTFOLIO_URL, TMDB_IMAGE } from "@/config/index";

const Nav = ({ inView = true, category }) => {
  const { userData, logout } = useContext(Context);
  // for search component
  const [childFocus, setChildFocus] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // for navbar anim scroll thing
  const [scrollUp, setScrollUp] = useState(true);

  const router = useRouter();

  const avatar = userData?.avatar.tmdb?.avatar_path;

  const searchHandler = async (e) => {
    e.preventDefault();
    await router.push(`/browse/search?q=${searchValue}`);

    if (router.pathname === "/browse/search") router.reload();
  };

  useEffect(() => {
    let mounted = true;

    if (!mounted) return;

    if (!window) return;

    let prevScrollpos = window.pageYOffset;

    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        setScrollUp(true);
      }
      if (prevScrollpos < currentScrollPos) {
        setScrollUp(false);
      }
      prevScrollpos = currentScrollPos;
    };

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <nav
      className={styles.nav}
      style={{
        backgroundColor:
          inView && !category ? "transparent" : "var(--pageBg100)",
        top: (!category && "0") || (scrollUp && "0"),
        position: category && "sticky",
        // for scroll anim
      }}
    >
      <div className={styles.navContainer}>
        <div className={styles.info}>
          <Link href="/" passHref>
            <div className={styles.logo}>Internet Flicks</div>
          </Link>
          <div className={styles.linkContainer}>
            <Link href="/browse" passHref>
              <div className={styles.link}>Home</div>
            </Link>
            <Link href="/browse/tv-shows" passHref>
              <div className={styles.link}>TV Shows</div>
            </Link>
            <Link href="/browse/movies" passHref>
              <div className={styles.link}>Movies</div>
            </Link>
            {userData && (
              <Link href="/account/my-list" passHref>
                <div className={styles.link}>My List</div>
              </Link>
            )}
          </div>
        </div>
        <div className={styles.infoCompact}>
          <Link href="/" passHref>
            <div className={styles.logo}>Internet Flicks</div>
          </Link>
          <div className={styles.browseBtn}>
            Browse
            <ArrowTiny />
            <div className={styles.browseBox}>
              <div className={styles.browsePointer}>
                <ArrowTiny />
              </div>
              <Link href="/browse" passHref>
                <div className={styles.link}>Home</div>
              </Link>
              <Link href="/browse/tv-shows" passHref>
                <div className={styles.link}>TV Shows</div>
              </Link>
              <Link href="/browse/movies" passHref>
                <div className={styles.link}>Movies</div>
              </Link>
              {userData && (
                <Link href="/account/my-list" passHref>
                  <div className={styles.link}>My List</div>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className={styles.user}>
          <form
            className={`${styles.searchBox}  ${
              !childFocus && styles.hideSearch
            }`}
            onSubmit={searchHandler}
          >
            <label htmlFor="search">
              <SearchIcon />
            </label>
            <input
              className={styles.searchField}
              id="search"
              type="text"
              name="search"
              placeholder="Movies, TV shows, genres"
              onFocus={() => setChildFocus(true)}
              onBlur={() => setChildFocus(false)}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <input
              type="submit"
              style={{ visibility: "hidden", position: "absolute" }}
            />
          </form>

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
            <div className={styles.pfp}>
              <Image
                src={
                  userData
                    ? `${TMDB_IMAGE}/original/${avatar}` || UserPfp
                    : GuestPfp
                }
                layout="fill"
                objectFit="cover"
                alt="avatar"
              />
            </div>
            <ArrowTiny />
            <div className={styles.accBox}>
              <div className={styles.pointer}>
                <ArrowTiny />
              </div>
              <div className={styles.btnsContainer}>
                <a href={PORTFOLIO_URL} target="_blank" rel="noreferrer">
                  Checkout my portfolio
                </a>
                {userData ? (
                  <>
                    <button onClick={logout}>Sign out</button>
                  </>
                ) : (
                  <Link href="/account/login" passHref>
                    <button>Sign in</button>
                  </Link>
                )}
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
