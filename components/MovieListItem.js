import { useContext } from "react";
import Image from "next/image";
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
      // style={{
      //   backgroundImage: `url(${TMDB_IMAGE}/t/p/w500/${movie.backdrop_path})`,
      //   backgroundSize: "cover",
      // }}
    >
      <div className={styles.image}>
        <Image
          src={`${TMDB_IMAGE}/w500/${movie.backdrop_path}`}
          layout="fill"
          alt={movie.original_title}
        />
      </div>
      {/* {movie.original_title} */}
    </div>
  );
};

export default MovieListItem;
