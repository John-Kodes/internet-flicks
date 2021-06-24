// Styles
import classes from "./Header.module.scss";
// Icons
import InfoIcon from "../img/InfoIcon";
import PlayIcon from "../img/PlayIcon";

const Header = () => {
  return (
    <header className={classes.header}>
      <h1>TITLE</h1>
      <p className={classes.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
        veniam. Eveniet aut dolor commodi sint quia alias, porro inventore unde?
      </p>
      <div className={classes.btnContainer}>
        <button className={classes.btnFill}>
          <PlayIcon />
          Play
        </button>
        <button className={classes.btnGhost}>
          <InfoIcon />
          More Info
        </button>
      </div>
      <div className={classes.ageRating}>16+</div>
    </header>
  );
};

export default Header;
