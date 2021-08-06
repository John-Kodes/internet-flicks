import { useContext } from "react";
import Image from "next/dist/client/image";
// Context
import Context from "@/context/Context";
// Images
import ArrowIcon from "@/images/ArrowIcon.svg";
// Styles
import styles from "@/styles/BackBtn.module.scss";

const BackBtn = () => {
  const { modalData, setModalData, setModalHistory, modalHistory } = useContext(
    Context
  );

  const goBackHandler = () => {
    if (modalHistory.length > 1) {
      setModalData(modalHistory[1]);

      console.log(modalHistory.slice(1));

      setModalHistory([...modalHistory.slice(1)]);
    }
  };

  return <button className={styles.btn} onClick={goBackHandler} />;
};

export default BackBtn;
