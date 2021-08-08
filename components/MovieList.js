import { useContext, useEffect, useState } from "react";
import Image from "next/dist/client/image";
// Context
import Context from "@/context/Context";
// Components
import MovieListItem from "@/components/MovieListItem";
// Helpers
import { defaultMovie } from "@/helpers/index";
// Images
import ArrowThinIcon from "@/images/ArrowThinIcon.svg";
// Styles
import styles from "@/styles/MovieList.module.scss";

const MovieList = ({ category = "Category", movies = [defaultMovie] }) => {
  const { sliderCap } = useContext(Context);
  const [isHover, setIsHover] = useState(false);

  const [slideNum, setSlideNum] = useState(0);

  const movieItems = movies.map((movie, i) => (
    <div className={styles.item} key={i}>
      <MovieListItem movie={movie} />
    </div>
  ));

  // 5% to scroll by 1 movieItem
  const btnScrollHandler = (direction) => {
    const max = movies.length - sliderCap;

    // if overshooting
    if (slideNum < max && direction === "right" && slideNum + sliderCap > max) {
      return setSlideNum(max);
    }
    if (slideNum > 0 && direction === "left" && slideNum - sliderCap < 0) {
      return setSlideNum(0);
    }

    // scrolls to a new chunk
    if (slideNum < max && direction === "right")
      setSlideNum(slideNum + sliderCap);
    if (slideNum > 0 && direction === "left") setSlideNum(slideNum - sliderCap);
  };

  return (
    <div className={styles.container}>
      <h2>{category}</h2>

      <button
        className={styles.btnScrollLeft}
        style={{ transform: (isHover || slideNum < 1) && "translateX(-100%)" }}
        onClick={() => btnScrollHandler("left")}
      >
        <div className={styles.svg}>
          <Image src={ArrowThinIcon} layout="fill" objectFit="contain" />
        </div>
      </button>
      <button
        className={styles.btnScrollRight}
        style={{
          transform:
            (isHover || slideNum >= movies.length - sliderCap) &&
            "translateX(100%)",
        }}
        onClick={() => btnScrollHandler("right")}
      >
        <div className={styles.svg}>
          <Image src={ArrowThinIcon} layout="fill" objectFit="contain" />
        </div>
      </button>
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
          <div
            className={styles.sliderMask}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{ transform: `translateX(-${slideNum * 5}%)` }}
          >
            {[...movieItems]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
