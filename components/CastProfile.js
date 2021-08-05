import { useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/dist/client/image";
// Context
import Context from "@/context/Context";
// Config
import { TMDB_IMAGE } from "@/config/index";
// Helpers
import { fetchMediaDetails } from "@/helpers/index";
// Images
import DefaultPersonPhotoMain from "@/images/DefaultPersonPhotoMain.svg";
// Styles
import styles from "@/styles/CastProfile.module.scss";

const CastProfile = ({ actor }) => {
  const { setModalData } = useContext(Context);

  const router = useRouter();

  const clickHandler = async () => {
    const mediaType = "person";

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, id: actor.id, media: mediaType },
      },
      undefined,
      {
        shallow: true,
      }
    );
    const mov = await fetchMediaDetails(actor.id, mediaType);

    setModalData(mov);
  };

  return (
    <div className={styles.container} onClick={clickHandler}>
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
