import Image from "next/dist/client/image";
// Components
import RoundBtn from "@/components/RoundBtn";
// Images
import DefaultBackdropThumbnail from "@/images/DefaultBackdropThumbnail.svg";
import PlusIcon from "@/images/PlusIcon.svg";
// Styles
import styles from "@/styles/RecomCard.module.scss";
import { TMDB_IMAGE } from "../config";

const RecomCard = ({ mediaData }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          src={
            (mediaData?.backdrop_path &&
              `${TMDB_IMAGE}/original${mediaData?.backdrop_path}`) ||
            DefaultBackdropThumbnail
          }
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={styles.detailsBox}>
        <div className={styles.watchListBtn}>
          <RoundBtn icon={PlusIcon} />
        </div>
        <div className={styles.headerDetails}>
          <h3 className={styles.title}>
            {mediaData?.original_title || mediaData?.original_name}
          </h3>
          <p className={styles.releaseDate}>
            {mediaData?.release_date.replaceAll("-", " / ")}
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
