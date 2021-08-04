import { useContext, useState, useEffect } from "react";
import Image from "next/dist/client/image";
import { TMDB_IMAGE, NEXT_URL, TMDB_API } from "@/config/index";
// Components
import RoundBtn from "@/components/RoundBtn";
// Context
import Context from "@/context/Context";
// Images
import DefaultBackdropThumbnail from "@/images/DefaultBackdropThumbnail.svg";
import PlusIcon from "@/images/PlusIcon.svg";
import CheckIcon from "@/images/CheckIcon.svg";
// Styles
import styles from "@/styles/RecomCard.module.scss";

const RecomCard = ({ mediaData }) => {
  const { userData, modalData } = useContext(Context);

  const [isInWatchList, setIsInWatchList] = useState(false);

  const mediaType =
    (mediaData?.original_title && "movie") ||
    (mediaData?.original_name && "tv") ||
    "person";

  const watchListHandler = async () => {
    const res = await fetch(`${NEXT_URL}/api/updateWatchList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: mediaData?.id,
        mediaType,
        update: !isInWatchList,
      }),
    });

    const data = await res.json();

    getMediaState();
  };

  const getMediaState = async () => {
    const res = await fetch(`${NEXT_URL}/api/getMediaState`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: mediaData?.id,
        mediaType,
      }),
    });

    const mediaState = await res.json();

    if (mediaState.id) {
      setIsInWatchList(mediaState.watchlist);
    } else {
      console.error(mediaState.message);
    }
  };

  useEffect(() => {
    // fetch media state
    if (mediaData?.id && mediaType !== "person") getMediaState();
  }, [mediaData]);

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          src={
            (mediaData?.backdrop_path &&
              `${TMDB_IMAGE}/w300${mediaData?.backdrop_path}`) ||
            DefaultBackdropThumbnail
          }
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={styles.detailsBox}>
        {userData && (
          <div className={styles.watchListBtn} onClick={watchListHandler}>
            <RoundBtn icon={!isInWatchList ? PlusIcon : CheckIcon} />
          </div>
        )}
        <div className={styles.headerDetails}>
          <h3 className={styles.title}>
            {mediaData?.original_title || mediaData?.original_name}
          </h3>
          <p className={styles.releaseDate}>
            {mediaData?.release_date?.replaceAll("-", " / ") ||
              mediaData?.first_air_date?.replaceAll("-", " / ")}
          </p>
        </div>
        <p className={styles.description}>
          {mediaData?.overview.split(" ").length > 25
            ? mediaData?.overview.split(" ").slice(0, 25).join(" ") + "..."
            : mediaData?.overview}
        </p>
      </div>
      <button className={styles.readMoreBtn}>Read more</button>
    </div>
  );
};

export default RecomCard;
