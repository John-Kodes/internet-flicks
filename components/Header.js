// API
import { TMDB_IMAGE } from "@/config/index";
// Styles
import styles from "@/styles/Header.module.scss";
// Icons
import InfoIcon from "../public/images/InfoIcon";
import PlayIcon from "../public/images/PlayIcon";

const Header = ({ movie }) => {
  return (
    <header
      className={styles.header}
      style={{
        backgroundImage: `linear-gradient(to bottom,rgba(20, 20, 20, 0) 85%,rgba(20, 20, 20, 1)), url(${TMDB_IMAGE}/t/p/original/${movie.backdrop_path})`,
        backgroundSize: "cover",
      }}
    >
      <h2 className={styles.movieTitle}>{movie.original_title}</h2>
      <p className={styles.description}>{movie.overview}</p>
      <div className={styles.btnContainer}>
        <button className={styles.btnFill}>
          <PlayIcon />
          Play
        </button>
        <button className={styles.btnGhost}>
          <InfoIcon />
          More Info
        </button>
      </div>
      {movie.rating && <div className={styles.ageRating}>16+</div>}
    </header>
  );
};

export default Header;
