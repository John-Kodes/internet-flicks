import { useContext } from "react";
// Components
import Context from "@/context/Context";
// API
import { TMDB_IMAGE } from "@/config/index";
// Helpers
import { defaultMovie } from "@/helpers/index";
// Styles
import styles from "@/styles/Header.module.scss";
// Icons
import InfoIcon from "@/images/InfoIcon";
import PlayIcon from "@/images/PlayIcon";
// Images
import DefaultBackdropMain from "@/images/DefaultBackdropMain.svg";

const Header = ({ movie = defaultMovie }) => {
  const { setModalOpen, setModalData } = useContext(Context);

  const ytKey = movie?.videos?.results.filter(
    (vid) => vid.type === "Trailer" && vid.official
  )[0]?.key;

  const showInfoHandler = () => {
    setModalOpen(true);
    setModalData(movie);
  };

  const cutDesc = (desc) => {
    if (desc.length < 219) return desc;
    return desc.slice(0, 219) + "...";
  };

  return (
    <header
      className={styles.header}
      // If backdrop image is not available, default backdrop image will be used
      style={{
        backgroundImage:
          (movie.backdrop_path &&
            `url(${TMDB_IMAGE}/original/${movie.backdrop_path})`) ||
          `url(${DefaultBackdropMain.src})`,
        backgroundSize: "cover",
      }}
    >
      <h2
        className={`${styles.movieTitle} ${
          movie.title.length > 20 && styles.movieTitleBig
        }`}
      >
        {movie.title}
      </h2>
      <div className={styles.descriptionContainer}>
        <p
          className={`${styles.description} ${
            movie.overview.length < 219 && styles.removeMask
          }`}
        >
          {movie.overview && cutDesc(movie.overview)}
        </p>
      </div>
      <div className={styles.btnContainer}>
        {ytKey && (
          <a
            target="_blank"
            href={`https://www.youtube.com/watch?v=${ytKey}`}
            className={styles.btnFill}
            rel="noreferrer"
          >
            <PlayIcon />
            Play Trailer
          </a>
        )}
        <button className={styles.btnGhost} onClick={showInfoHandler}>
          <InfoIcon />
          More Info
        </button>
      </div>
      {movie.rating && <div className={styles.ageRating}>16+</div>}
    </header>
  );
};

export default Header;
