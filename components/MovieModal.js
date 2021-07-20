import { useContext } from "react";
import { useRouter } from "next/router";

import { TMDB_IMAGE } from "@/config/index";

import CloseBtn from "@/components/CloseBtn";
import RoundBtn from "@/components/RoundBtn";

import PlayIcon from "@/images/PlayIcon";
import PlusIcon from "@/images/PlusIcon.svg";
import ThumbsDown from "@/images/ThumbsDown.svg";
import ThumbsUp from "@/images/ThumbsUp.svg";

import Context from "@/context/Context";

import styles from "@/styles/MovieModal.module.scss";
import DefaultBackdropMain from "@/images/DefaultBackdropMain.svg";

const MovieModal = ({ leavePageHandler, leavePageHandlerBtn }) => {
  const {
    modalOpen,
    setModalOpen,
    setModalData,
    modalData: movie,
  } = useContext(Context);

  const router = useRouter();

  const closeHandler = () => {
    router.push({ pathname: router.asPath.split("?")[0] }, undefined, {
      shallow: true,
    });
    setModalOpen(false);
    setModalData({});
  };

  const overlayHandler = (e) => {
    if (!e.target.classList.contains(`${styles.overlay}`)) return;
    closeHandler();
  };

  const ArrStr = (genres) => {
    if (!genres) return;
    return genres.map((genre) => genre.name).join(", ");
  };

  return (
    <>
      {modalOpen && movie.id && (
        <div
          className={styles.overlay}
          onClick={
            (leavePageHandler &&
              ((e) => leavePageHandler(e, styles.overlay))) ||
            overlayHandler
          }
        >
          <div className={styles.modal}>
            <CloseBtn closeHandler={leavePageHandlerBtn || closeHandler} />
            <div
              className={styles.hero}
              // sets background image to movieImage. If unavailable, default image is used
              style={{
                backgroundImage:
                  (movie.backdrop_path &&
                    `linear-gradient(to bottom, rgba(20, 20, 20, 0) 70%,rgba(20, 20, 20, 1) ), 
                url(${TMDB_IMAGE}/original/${movie.backdrop_path})`) ||
                  `url(${DefaultBackdropMain.src})`,
              }}
            >
              <div className={styles.heroContent}>
                <h1
                  className={styles.title}
                  style={
                    movie.original_title?.length > 33 ||
                    movie.original_name?.length > 33
                      ? { fontSize: "3rem", maxWidth: "30ch" }
                      : {}
                  }
                >
                  {movie.original_title || movie.original_name}
                </h1>
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
                    {movie.release_date && movie.release_date.slice(0, 4)}
                  </div>
                </div>
                <p className={styles.description}>
                  {movie.overview || "Unavailable"}
                </p>
              </div>
              <div className={styles.detailsSecondary}>
                <div className={styles.genres}>
                  <span>
                    Genre{movie.genres && movie.genres.length > 1 ? "s" : ""}:{" "}
                  </span>
                  {ArrStr(movie.genres) || "Unavailable"}
                </div>
                <div className={styles.studios}>
                  <span>Produced by: </span>
                  {ArrStr(movie.production_companies) || "Unavailable"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieModal;
