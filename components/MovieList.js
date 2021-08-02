import { useState } from "react";
import Image from "next/dist/client/image";
// Components
import MovieListItem from "@/components/MovieListItem";
// Helpers
import { defaultMovie } from "@/helpers/index";
// Images
import ArrowThinIcon from "@/images/ArrowThinIcon.svg";
// Styles
import styles from "@/styles/MovieList.module.scss";

const MovieList = ({ category = "Category", movies = [defaultMovie] }) => {
  const [isHover, setIsHover] = useState(false);

  const movieItems = movies.map((movie, i) => (
    <div className={styles.item}>
      <MovieListItem key={i} movie={movie} />
    </div>
  ));

  return (
    <div className={styles.container}>
      <h2>{category}</h2>

      <a className={styles.btnScrollLeft}>
        <div className={styles.svg}>
          <Image src={ArrowThinIcon} layout="fill" objectFit="contain" />
        </div>
      </a>
      <a className={styles.btnScrollRight}>
        {" "}
        <div className={styles.svg}>
          <Image src={ArrowThinIcon} layout="fill" objectFit="contain" />
        </div>
      </a>
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
          <div className={styles.sliderMask}>{[...movieItems]}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
