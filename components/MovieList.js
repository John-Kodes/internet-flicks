// Components
import MovieListItem from "@/components/MovieListItem";
// Helpers
import { defaultMovie } from "@/helpers/index";
// Styles
import styles from "@/styles/MovieList.module.scss";

const MovieList = ({ category = "Category", movies = [defaultMovie] }) => {
  const movieItems = movies.map((movie, i) => (
    <div className={styles.item}>
      <MovieListItem key={i} movie={movie} />
    </div>
  ));

  return (
    <div className={styles.container}>
      <h2>{category}</h2>
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
          <div className={styles.sliderMask}>{[...movieItems]}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
