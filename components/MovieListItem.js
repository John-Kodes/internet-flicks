import { useContext } from "react";
// Context
import Context from "@/context/Context";
// Styles
import styles from "@/styles/MovieListItem.module.scss";

const MovieListItem = ({ movie }) => {
  const { setModalOpen } = useContext(Context);

  return (
    <div className={styles.container} onClick={() => setModalOpen(true)}>
      {movie.original_title}
    </div>
  );
};

export default MovieListItem;
