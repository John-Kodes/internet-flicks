import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
// API
import { TMDB_IMAGE } from "@/config/index";
// Context
import Context, { ContextProvider } from "@/context/Context";
// Styles
import styles from "@/styles/MovieListItem.module.scss";
// Images
import DefaultBackDropThumbnail from "@/images/DefaultBackdropThumbnail.svg";
import DefaultProfileThumbnail from "@/images/DefaultProfileThumbnail.svg";
// Mobile Detect
import { isMobile } from "react-device-detect";
// Helpers
import { fetchMediaDetails } from "@/helpers/index";

const MovieListItem = ({ movie }) => {
  const {
    setModalOpen,
    setModalData,
    setModalHistory,
    modalHistory,
  } = useContext(Context);

  const [isHover, setIsHover] = useState(false);

  const router = useRouter();

  const imageSrc =
    movie.backdrop_path ||
    movie.poster_path ||
    movie.profile_path ||
    movie.profile_path;

  const clickHandler = async () => {
    const mediaType = movie.original_title
      ? "movie"
      : movie.original_name
      ? "tv"
      : "person";

    setModalOpen(true);

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, id: movie.id, media: mediaType },
      },
      undefined,
      {
        shallow: true,
      }
    );
    const mov = await fetchMediaDetails(movie.id, mediaType);

    setModalData(mov);
    setModalHistory([mov, ...modalHistory]);
  };

  return (
    <div
      className={styles.container}
      onClick={clickHandler}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={styles.infoBox}
        style={{
          transform:
            (isHover && "translateY(0)") || (isMobile && "translateY(0)"),
        }}
      >
        <div className={styles.movieName}>
          <div className={styles.title}>{movie?.title || movie?.name}</div>
        </div>
      </div>
      <div className={styles.image}>
        <Image
          src={
            (movie.known_for_department &&
              !imageSrc &&
              DefaultProfileThumbnail) ||
            (imageSrc && `${TMDB_IMAGE}/w300/${imageSrc}`) ||
            DefaultBackDropThumbnail
          }
          objectFit={
            (movie.profile_path && "contain") || (movie.poster_path && "cover")
          }
          layout="fill"
          alt={movie.title}
          className={!imageSrc ? styles.imgFix : undefined}
        />
        {movie.profile_path && (
          <div
            className={styles.backgroundImage}
            style={{
              backgroundImage: `url(${TMDB_IMAGE}/w300/${imageSrc})`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MovieListItem;
