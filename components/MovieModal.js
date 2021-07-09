import { useContext } from "react";
import CloseBtn from "@/components/CloseBtn";
import Context from "@/context/Context";
import styles from "@/styles/MovieModal.module.scss";

const MovieModal = () => {
  const { modalOpen } = useContext(Context);
  return (
    <>
      {modalOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <CloseBtn />
            <div className={styles.hero}>MOVIE IMAGE</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieModal;
