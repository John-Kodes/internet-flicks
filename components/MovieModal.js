import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { TMDB_IMAGE, NEXT_URL } from "@/config/index";

import CloseBtn from "@/components/CloseBtn";
import RoundBtn from "@/components/RoundBtn";

import PlayIcon from "@/images/PlayIcon";
import PlusIcon from "@/images/PlusIcon.svg";
import CheckIcon from "@/images/CheckIcon.svg";
import RatingIconGhost from "@/images/RatingIconGhost.svg";
import RatingIconFill from "@/images/RatingIconFill.svg";

import Context from "@/context/Context";

import styles from "@/styles/MovieModal.module.scss";
import DefaultBackdropMain from "@/images/DefaultBackdropMain.svg";

const MovieModal = ({ leavePageHandler, leavePageHandlerBtn }) => {
  const {
    modalOpen,
    setModalOpen,
    setModalData,
    modalData: movie,
    userData,
  } = useContext(Context);

  const [isInWatchList, setIsInWatchList] = useState(false);
  const [isRated, setIsRated] = useState(false);

  const router = useRouter();

  const mediaType =
    (movie.original_title && "movie") || (movie.original_name && "tv");

  const getMediaState = async () => {
    const res = await fetch(`${NEXT_URL}/api/getMediaState`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: movie.id,
        mediaType,
      }),
    });

    const mediaState = await res.json();
    console.log(mediaState);

    if (mediaState.id) {
      setIsInWatchList(mediaState.watchlist);
      setIsRated(mediaState.rated);
    } else {
      console.log(mediaState.message);
    }
  };

  const watchListHandler = async () => {
    const res = await fetch(`${NEXT_URL}/api/updateWatchList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: movie.id,
        mediaType,
        update: !isInWatchList,
      }),
    });

    const data = await res.json();

    getMediaState();

    console.log(data);
  };

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

  const ArrStr = (items) => {
    if (!items) return;
    return items.map((item) => item.name).join(", ");
  };

  useEffect(() => {
    if (movie.id) getMediaState();
  }, [movie.id]);

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
                  {/* clicking on the plus icon will add to list */}
                  {userData && (
                    <div
                      className={styles.addToListBtn}
                      onClick={watchListHandler}
                    >
                      <RoundBtn icon={isInWatchList ? CheckIcon : PlusIcon} />
                    </div>
                  )}

                  <div className={styles.ratingBtn} onClick={getMediaState}>
                    <RoundBtn
                      icon={isRated ? RatingIconFill : RatingIconGhost}
                    />
                  </div>
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
