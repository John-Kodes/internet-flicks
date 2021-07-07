import Image from "next/image";
// Styles
import styles from "@/styles/MovieList.module.scss";

const MovieList = ({ category = "Category" }) => {
  return (
    <div className={styles.container}>
      <h2>{category}</h2>
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
          <div className={styles.sliderMask}>
            <div className={styles.testThumbnail}>test</div>
            <div className={styles.testThumbnail}>test</div>
            <div className={styles.testThumbnail}>test</div>
            <div className={styles.testThumbnail}>test</div>
            <div className={styles.testThumbnail}>test</div>
            <div className={styles.testThumbnail}>test</div>
            <div className={styles.testThumbnail}>test</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
