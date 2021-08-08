import Image from "next/dist/client/image";
// Config
import { TMDB_IMAGE } from "@/config/index";
// Components
import BackBtn from "@/components/BackBtn";
import CloseBtn from "@/components/CloseBtn";
// images
import DefaultPersonPhotoMain from "@/images/DefaultPersonPhotoMain.svg";
// Styles
import styles from "@/styles/PersonModalSmall.module.scss";
const PersonModalSmall = ({ data, backBtnBool, closeHandler }) => {
  // pfp, name, bio
  return (
    <div className={styles.container}>
      <CloseBtn closeHandler={closeHandler} />
      {backBtnBool && <BackBtn />}
      <div className={styles.header}>
        <div className={styles.pfpContainer}>
          <Image
            src={
              (data?.profile_path &&
                `${TMDB_IMAGE}/w185${data?.profile_path}`) ||
              DefaultPersonPhotoMain
            }
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={styles.mainInfoBox}>
          <h2 className={styles.personName}>{data?.name}</h2>
          <p className={styles.department}>
            {data?.known_for_department || "Undisclosed"}
          </p>
          <p className={styles.birthday}>
            {data?.birthday?.replaceAll("-", " / ") ||
              "Birthdate is undisclosed"}

            {data?.deathday && (
              <>
                &nbsp;&nbsp; &mdash; &nbsp;&nbsp;
                {data?.deathday.replaceAll("-", " / ")}
              </>
            )}
          </p>
          <p className={styles.birthPlace}>
            {data?.place_of_birth || "Born on Earth... Probably"}
          </p>
        </div>
      </div>
      <div className={styles.biography}>
        <h2>Biography</h2>
        <p>
          {data?.biography || "Currently does not have a biography written"}
        </p>
      </div>
    </div>
  );
};

export default PersonModalSmall;
