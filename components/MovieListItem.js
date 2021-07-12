import { useContext } from "react";
import Image from "next/image";
// API
import { TMDB_IMAGE } from "@/config/index";
// Context
import Context from "@/context/Context";
// Styles
import styles from "@/styles/MovieListItem.module.scss";
// Helpers
import { fetchMovie } from "@/helpers/index";

const MovieListItem = ({ movie }) => {
  const { setModalOpen, setModalData } = useContext(Context);

  const clickHandler = async () => {
    setModalOpen(true);
    const mov = await fetchMovie(movie.id);
    setModalData(mov);
  };

  return (
    <div className={styles.container} onClick={clickHandler}>
      <div className={styles.image}>
        <Image
          src={`${TMDB_IMAGE}/w500/${movie.backdrop_path}`}
          layout="fill"
          alt={movie.original_title}
        />
      </div>
    </div>
  );
};

export default MovieListItem;
