// Styles
import classes from "./MovieList.module.scss";

const MovieList = ({ category = "Category" }) => {
  const MovieCards = () => {
    const MovieCardsArr = [];

    for (let i = 0; i < 6; i++) {
      MovieCardsArr.push(
        <div className={classes.movieCard} key={i}>
          <img
            src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABf57EfafDcNIRQOLUA3ygJetGUugBRah_ZpjFJmD160gIM8HPf48iTVqD4vEPInTIzY_4K1d0TiA_ykB-5wTpTYYvm4.webp?r=994"
            alt="Movie Card"
          />
        </div>
      );
    }

    return MovieCardsArr;
  };
  return (
    <div className={classes.container}>
      <h2>{category}</h2>
      <div className={classes.listContainer}>
        <div className={classes.sliderMask}>{MovieCards()}</div>
      </div>
    </div>
  );
};

export default MovieList;
