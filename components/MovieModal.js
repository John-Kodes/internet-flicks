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
import { FaExclamationTriangle } from "react-icons/fa";

const MovieModal = ({ leavePageHandler, leavePageHandlerBtn }) => {
  const {
    modalOpen,
    setModalOpen,
    setModalData,
    modalData: movie,
    userData,
  } = useContext(Context);

  const [isInWatchList, setIsInWatchList] = useState(false);
  const [initRating, setInitRating] = useState(0);

  // Input
  const [ratingValue, setRatingValue] = useState(1);
  const [inputFocus, setInputFocus] = useState(false);

  const router = useRouter();

  const mediaType =
    (movie.original_title && "movie") || (movie.original_name && "tv");

  const getMediaState = async (ratingValue) => {
    if (!userData) return;
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

    if (mediaState.id) {
      setIsInWatchList(mediaState.watchlist);
      setInitRating(ratingValue || mediaState.rated.value);
    } else {
      console.error(mediaState.message);
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
  };

  const updateRating = async (e) => {
    e.preventDefault();
    console.log("submit");

    const res = await fetch(`${NEXT_URL}/api/updateRating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: movie.id,
        value: ratingValue,
        mediaType,
      }),
    });

    const data = await res.json();

    if (data.success) {
      getMediaState(ratingValue);
    } else console.log(data.message);
  };

  const ratingSelectedHandler = () => {
    setInputFocus(true);
    document.getElementById("rating").focus();
  };

  const closeHandler = () => {
    router.push(
      {
        pathname: router.pathname,
        query: { q: router.query.q },
      },
      undefined,
      {
        shallow: true,
      }
    );
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
      {movie.success === false && (
        <div
          className={styles.overlay}
          onClick={
            (leavePageHandler &&
              ((e) => leavePageHandler(e, styles.overlay))) ||
            overlayHandler
          }
        >
          <div className={styles.errorModal}>
            <CloseBtn closeHandler={leavePageHandlerBtn || closeHandler} />
            <FaExclamationTriangle />
            <h2>Whoops!?</h2>
            <p>{movie.status_message}</p>
            <p>Please try selecting another movie or tv show</p>
          </div>
        </div>
      )}
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
                    <>
                      <div
                        className={
                          isInWatchList
                            ? styles.removeFromListBtn
                            : styles.addToListBtn
                        }
                        onClick={watchListHandler}
                      >
                        <RoundBtn icon={isInWatchList ? CheckIcon : PlusIcon} />
                      </div>

                      <div
                        className={styles.ratingBtn}
                        onClick={ratingSelectedHandler}
                      >
                        {initRating > 0 && !inputFocus && (
                          <div className={styles.userRating}>{initRating}</div>
                        )}
                        <RoundBtn
                          icon={initRating ? RatingIconFill : RatingIconGhost}
                        />
                      </div>

                      <form
                        className={styles.form}
                        onSubmit={updateRating}
                        style={{
                          opacity: !inputFocus ? 0 : 1,
                          maxWidth: !inputFocus ? "0px" : "100vw",
                          maxHeight: !inputFocus ? "0px" : "100vw",
                          transform: !inputFocus
                            ? "translateX(-2vw)"
                            : "translateX(0)",
                        }}
                      >
                        <label htmlFor="rating" className={styles.ratingLabel}>
                          {ratingValue % 1 === 0 && ratingValue < 10
                            ? ratingValue + ".0"
                            : ratingValue}
                        </label>
                        <input
                          type="range"
                          name="rating"
                          id="rating"
                          min="0.5"
                          max="10"
                          step="0.5"
                          onChange={(e) => setRatingValue(e.target.value)}
                          onFocus={() => setInputFocus(true)}
                          onBlur={() => setInputFocus(false)}
                          className={styles.ratingInput}
                        />
                        <button
                          className={styles.ratingSubmit}
                          onClick={(e) => {
                            updateRating(e);
                          }}
                        >
                          OK
                        </button>
                      </form>
                    </>
                  )}
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
