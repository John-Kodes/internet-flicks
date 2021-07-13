import { useContext } from "react";

import { TMDB_IMAGE } from "@/config/index";

import CloseBtn from "@/components/CloseBtn";
import RoundBtn from "@/components/RoundBtn";

import PlayIcon from "@/images/PlayIcon";
import PlusIcon from "@/images/PlusIcon.svg";
import ThumbsDown from "@/images/ThumbsDown.svg";
import ThumbsUp from "@/images/ThumbsUp.svg";

import Context from "@/context/Context";
import styles from "@/styles/MovieModal.module.scss";

const MovieModal = () => {
  const {
    modalOpen,
    setModalOpen,
    setModalData,
    modalData: movie,
  } = useContext(Context);

  console.log(movie);

  const closeHandler = () => {
    setModalOpen(false);
    setModalData({});
  };

  return (
    <>
      {modalOpen && (
        <div className={styles.overlay} onClick={closeHandler}>
          <div className={styles.modal}>
            <CloseBtn closeHandler={closeHandler} />
            <div
              className={styles.hero}
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(20, 20, 20, 0) 70%,rgba(20, 20, 20, 1) ), url('${TMDB_IMAGE}/original/${movie.backdrop_path}')`,
              }}
            >
              <div className={styles.heroContent}>
                <h1 className={styles.title}>{movie.original_title}</h1>
                <div className={styles.btnContainer}>
                  <button className={styles.trailerBtn}>
                    <PlayIcon />
                    Play Trailer
                  </button>
                  <RoundBtn icon={PlusIcon} />
                  <RoundBtn icon={ThumbsUp} />
                  <RoundBtn icon={ThumbsDown} />
                </div>
              </div>
            </div>
            <div className={styles.detailsBox}>
              <div className={styles.detailsMain}>
                <div className={styles.metaData}>
                  <div className={styles.audienceScore}>
                    {movie.vote_average} / 10
                  </div>
                  <div className={styles.year}>
                    {movie.release_date.slice(0, 4)}
                  </div>
                </div>
                <p className={styles.description}>{movie.overview}</p>
              </div>
              <div className={styles.detailsSecondary}>secondary</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
//  audience score, year of release, description, genres

/* <div className={styles.heroImage}>
                <Image
                  src={`${TMDB_IMAGE}/original/${movie.backdrop_path}`}
                  layout="fill"
                />
              </div> */

export default MovieModal;
