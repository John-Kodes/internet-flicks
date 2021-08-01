import { useContext } from "react";
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
// Helpers
import { fetchMediaDetails } from "@/helpers/index";

const MovieListItem = ({ movie }) => {
  const { setModalOpen, setModalData } = useContext(Context);
  const router = useRouter();

  const imageSrc = movie.backdrop_path || movie.profile_path || undefined;

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
  };

  return (
    <div className={styles.container} onClick={clickHandler}>
      <div className={styles.image}>
        <Image
          src={
            (imageSrc && `${TMDB_IMAGE}/w300/${imageSrc}`) ||
            DefaultBackDropThumbnail
          }
          objectFit={movie.profile_path && "contain"}
          layout="fill"
          alt={movie.original_title}
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
