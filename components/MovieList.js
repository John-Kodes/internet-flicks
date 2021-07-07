// Components
import MovieListItem from "./MovieListItem";
// Styles
import styles from "@/styles/MovieList.module.scss";

const MovieList = ({ category = "Category" }) => {
  const moviesArr = [];

  for (let i = 0; i < 6; i++) {
    moviesArr.push(<MovieListItem key={i} />);
  }

  return (
    <div className={styles.container}>
      <h2>{category}</h2>
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
          <div className={styles.sliderMask}>{[...moviesArr]}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
