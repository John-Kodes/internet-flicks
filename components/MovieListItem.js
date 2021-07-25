import { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
// API
import { TMDB_IMAGE } from "@/config/index";
// Context
import Context from "@/context/Context";
// Styles
import styles from "@/styles/MovieListItem.module.scss";
// Images
import DefaultBackDropThumbnail from "@/images/DefaultBackdropThumbnail.svg";
// Helpers
import { fetchMediaDetails } from "@/helpers/index";

const MovieListItem = ({ movie, mediaType }) => {
  const { setModalOpen, setModalData } = useContext(Context);
  const router = useRouter();

  const clickHandler = async () => {
    setModalOpen(true);

    router.push(
      { pathname: router.asPath, query: { id: movie.id } },
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
            (movie.backdrop_path &&
              `${TMDB_IMAGE}/w300/${movie.backdrop_path}`) ||
            DefaultBackDropThumbnail
          }
          layout="fill"
          alt={movie.original_title}
          className={!movie.backdrop_path ? styles.imgFix : undefined}
        />
      </div>
    </div>
  );
};

export default MovieListItem;
