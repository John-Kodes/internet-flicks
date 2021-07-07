// Styles
import styles from "@/styles/Header.module.scss";
// Icons
import InfoIcon from "../public/images/InfoIcon";
import PlayIcon from "../public/images/PlayIcon";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>TITLE</h1>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
        veniam. Eveniet aut dolor commodi sint quia alias, porro inventore unde?
      </p>
      <div className={styles.btnContainer}>
        <button className={styles.btnFill}>
          <PlayIcon />
          Play
        </button>
        <button className={styles.btnGhost}>
          <InfoIcon />
          More Info
        </button>
      </div>
      <div className={styles.ageRating}>16+</div>
    </header>
  );
};

export default Header;
