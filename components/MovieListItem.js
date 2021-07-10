import { useContext } from "react";
// API
import { TMDB_IMAGE } from "@/config/index";
// Context
import Context from "@/context/Context";
// Styles
import styles from "@/styles/MovieListItem.module.scss";

const MovieListItem = ({ movie }) => {
  const { setModalOpen } = useContext(Context);

  return (
    <div
      className={styles.container}
      onClick={() => setModalOpen(true)}
      style={{
        backgroundImage: `url(${TMDB_IMAGE}/t/p/w500/${movie.backdrop_path})`,
        backgroundSize: "cover",
      }}
    >
      {/* {movie.original_title} */}
    </div>
  );
};

export default MovieListItem;
