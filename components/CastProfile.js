import Image from "next/dist/client/image";

// Config
import { TMDB_IMAGE } from "@/config/index";
// Images
import DefaultPersonPhotoMain from "@/images/DefaultPersonPhotoMain.svg";
// Styles
import styles from "@/styles/CastProfile.module.scss";

const CastProfile = ({ actor }) => {
  return (
    <div className={styles.container}>
      <div className={styles.profilePic}>
        <Image
          src={
            actor.profile_path
              ? `${TMDB_IMAGE}/w185/${actor.profile_path}`
              : DefaultPersonPhotoMain
          }
          layout="fill"
        />
      </div>
      <div className={styles.nameContainer}>
        <h3 className={styles.actorName}>{actor.name}</h3>
        <h4 className={styles.characterName}>{actor.character}</h4>
      </div>
    </div>
  );
};

export default CastProfile;
