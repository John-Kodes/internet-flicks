import { useContext } from "react";
// Context
import Context from "@/context/Context";
// Styles
import styles from "@/styles/MovieListItem.module.scss";

const MovieListItem = () => {
  const { setModalOpen } = useContext(Context);
  return (
    <div className={styles.container} onClick={() => setModalOpen(true)}>
      item
    </div>
  );
};

export default MovieListItem;
