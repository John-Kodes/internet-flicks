import { useContext } from "react";
import Image from "next/dist/client/image";

import { TMDB_IMAGE } from "@/config/index";

import CloseBtn from "@/components/CloseBtn";
import Context from "@/context/Context";
import styles from "@/styles/MovieModal.module.scss";

const MovieModal = () => {
  const {
    modalOpen,
    setModalOpen,
    setModalData,
    modalData: movie,
  } = useContext(Context);

  console.log(movie);

  const closeHandler = () => {
    setModalOpen(false);
    setModalData({});
  };

  return (
    <>
      {modalOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <CloseBtn closeHandler={closeHandler} />
            <div className={styles.hero}>
              <Image
                src={`${TMDB_IMAGE}/original/${movie.backdrop_path}`}
                layout="fill"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieModal;
