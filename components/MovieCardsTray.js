// Components
import MovieListItem from "@/components/MovieListItem";
import MovieCard from "@/components/MovieCard";
// Styles
import styles from "@/styles/MovieCardsTray.module.scss";

const MovieCardsTray = ({ movies }) => {
  const movieNames = movies.map((movie, i) => (
    <MovieCard key={i} movie={movie} />
  ));

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        <div className={styles.sliderMask}>{[...movieNames]}</div>
      </div>
    </div>
  );
};

export default MovieCardsTray;
