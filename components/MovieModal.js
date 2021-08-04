import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/dist/client/image";

import { TMDB_IMAGE, NEXT_URL, TMDB_API, API_KEY } from "@/config/index";

import CloseBtn from "@/components/CloseBtn";
import RoundBtn from "@/components/RoundBtn";
import CastProfile from "@/components/CastProfile";
import RecomCard from "@/components/RecomCard";

import { FaExclamationTriangle } from "react-icons/fa";
import PlayIcon from "@/images/PlayIcon";
import PlusIcon from "@/images/PlusIcon.svg";
import CheckIcon from "@/images/CheckIcon.svg";
import ArrowIcon from "@/images/ArrowIcon.svg";
import RatingIconGhost from "@/images/RatingIconGhost.svg";
import RatingIconFill from "@/images/RatingIconFill.svg";
import DefaultBackdropMain from "@/images/DefaultBackdropMain.svg";
import DefaultPersonPhotoMain from "@/images/DefaultPersonPhotoMain.svg";

import Context from "@/context/Context";

import styles from "@/styles/MovieModal.module.scss";

const MovieModal = ({ leavePageHandler, leavePageHandlerBtn }) => {
  const {
    modalOpen,
    modalData,
    setModalOpen,
    setModalData,
    modalData: movie,
    userData,
  } = useContext(Context);

  // List
  const [isInWatchList, setIsInWatchList] = useState(false);
  const [initRating, setInitRating] = useState(0);
  const [expand, setExpand] = useState(false);

  // Input
  const [ratingValue, setRatingValue] = useState(1);
  const [inputFocus, setInputFocus] = useState(false);

  // Extra data
  const [castArr, setCastArr] = useState([]);
  const [recomArr, setRecomArr] = useState([]);

  const router = useRouter();

  const mediaType =
    (movie?.original_title && "movie") ||
    (movie?.original_name && "tv") ||
    "person";

  const getMediaState = async (ratingValue) => {
    if (!userData) return;
    const res = await fetch(`${NEXT_URL}/api/getMediaState`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: movie?.id,
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
        id: movie?.id,
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
        id: movie?.id,
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
        query: {
          ...(router.pathname.split("/").includes("search") && {
            q: router.query.q,
          }),
        },
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

  const getMediaCredits = async () => {
    const creditsRes = await fetch(
      `${TMDB_API}/${mediaType}/${movie?.id}/credits${API_KEY}&language=en-US`
    );
    const data = await creditsRes.json();

    setCastArr(data.cast);
  };

  const getMediaRecommendations = async () => {
    const res = await fetch(
      `${TMDB_API}/${mediaType}/${movie?.id}/recommendations${API_KEY}&language=en-US&page=1`
    );
    const data = await res.json();

    setRecomArr(data.results);
  };

  useEffect(() => {
    // When modal loads in and there is modal data, it will fetch media state of movie or tv show
    if (movie?.id && mediaType !== "person") getMediaState();
    // When media type is not a person, it will fetch credits for a movie
    if (modalData && mediaType !== "person") {
      getMediaCredits();
      getMediaRecommendations();
    }

    return function cleanUp() {
      setInitRating(0);
      setIsInWatchList(false);
      setExpand(false);
    };
  }, [modalData]);

  return (
    <>
      {movie?.success === false ||
        (movie?.media_type === "person" && (
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
              <p>{movie?.status_message}</p>
              <p>Please try selecting another movie or tv show</p>
            </div>
          </div>
        ))}
      {modalOpen && movie?.id && (
        <div
          className={styles.overlay}
          onClick={
            (leavePageHandler &&
              ((e) => leavePageHandler(e, styles.overlay))) ||
            overlayHandler
          }
          id="modal"
        >
          {/* shows Movie or person info  */}
          {mediaType !== "person" ? (
            <div className={styles.modal}>
              <CloseBtn closeHandler={leavePageHandlerBtn || closeHandler} />
              <>
                <div
                  className={styles.hero}
                  // sets background image to movieImage. If unavailable, default image is used
                  style={{
                    backgroundImage:
                      (movie?.backdrop_path &&
                        `linear-gradient(to bottom, rgba(20, 20, 20, 0) 70%,rgba(20, 20, 20, 1) ), 
                url(${TMDB_IMAGE}/original/${movie?.backdrop_path})`) ||
                      `url(${DefaultBackdropMain.src})`,
                  }}
                >
                  <div className={styles.heroContent}>
                    <h1
                      className={styles.title}
                      style={
                        movie?.original_title?.length > 33 ||
                        movie?.original_name?.length > 33
                          ? { fontSize: "3rem", maxWidth: "30ch" }
                          : {}
                      }
                    >
                      {movie?.title || movie?.name}
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
                            <RoundBtn
                              icon={isInWatchList ? CheckIcon : PlusIcon}
                            />
                          </div>

                          <div
                            className={styles.ratingBtn}
                            onClick={ratingSelectedHandler}
                          >
                            {initRating > 0 && !inputFocus && (
                              <div className={styles.userRating}>
                                {initRating}
                              </div>
                            )}
                            <RoundBtn
                              icon={
                                initRating ? RatingIconFill : RatingIconGhost
                              }
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
                            <label
                              htmlFor="rating"
                              className={styles.ratingLabel}
                            >
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

                <div className={styles.allDetailsBox}>
                  <div className={styles.detailsBox}>
                    <div className={styles.detailsMain}>
                      <div className={styles.metaData}>
                        <div className={styles.audienceScore}>
                          {movie?.vote_average} / 10
                        </div>
                        <div className={styles.year}>
                          {movie?.release_date &&
                            movie?.release_date.slice(0, 4)}
                        </div>
                      </div>
                      <p className={styles.description}>
                        {movie?.overview || "Description is unavailable"}
                      </p>
                    </div>
                    <div className={styles.detailsSecondary}>
                      <div className={styles.genres}>
                        <span>
                          Genre
                          {movie?.genres && movie?.genres.length > 1 ? "s" : ""}
                          :{" "}
                        </span>
                        {ArrStr(movie?.genres) || "Unavailable"}
                      </div>
                      <div className={styles.studios}>
                        <span>Produced by: </span>
                        {ArrStr(movie?.production_companies) || "Unavailable"}
                      </div>
                    </div>
                  </div>
                  <div className={styles.castBox}>
                    <h2>MAIN CAST</h2>
                    <div className={styles.castList}>
                      {castArr.length !== 0 ? (
                        castArr.map((actor, i) => {
                          if (i > 3) return;
                          return <CastProfile actor={actor} key={actor.id} />;
                        })
                      ) : (
                        <p className={styles.noCast}>
                          Cast members were not included.
                        </p>
                      )}
                    </div>
                    {castArr.length > 4 && <p>and more...</p>}
                  </div>
                  {recomArr?.length > 0 && (
                    <div className={styles.recommendBox}>
                      <h2>More Like This</h2>
                      <div className={styles.resizeBtnContainer}>
                        <div
                          className={styles.resizeBtn}
                          onClick={() => setExpand(!expand)}
                        >
                          <RoundBtn icon={ArrowIcon} />
                        </div>
                      </div>
                      <div
                        className={`${styles.recommendList} ${
                          expand && styles.showList
                        }`}
                      >
                        {recomArr?.map((media, i) => (
                          <RecomCard mediaData={media} key={i} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            </div>
          ) : (
            // no info: name, known_department, popularity... and that's p much it ¯\_(ツ)_/¯
            <div className={styles.personModal}>
              <div className={styles.personContainer}>
                <div className={styles.personPfp}>
                  <Image
                    src={
                      (movie?.profile_path &&
                        `${TMDB_IMAGE}/original${movie?.profile_path}`) ||
                      DefaultPersonPhotoMain
                    }
                    layout="fill"
                  />
                </div>
                <div className={styles.personInfoBox}>
                  <div className={styles.basicInfoBox}>
                    <h2 className={styles.personName}>{movie?.name}</h2>
                    <p className={styles.department}>
                      {movie?.known_for_department || "Undisclosed"}
                    </p>
                    <p className={styles.birthday}>
                      {movie?.birthday?.replaceAll("-", " / ") ||
                        "Birthdate is undisclosed"}

                      {movie?.deathday && (
                        <>
                          &nbsp;&nbsp; &mdash; &nbsp;&nbsp;
                          {movie?.deathday.replaceAll("-", " / ")}
                        </>
                      )}
                    </p>
                    <p className={styles.birthPlace}>
                      {movie?.place_of_birth || "Born on Earth... Probably"}
                    </p>
                  </div>
                  <div className={styles.biography}>
                    <h2>Biography</h2>
                    <p>
                      {movie?.biography ||
                        "Currently does not have a biography written"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MovieModal;
