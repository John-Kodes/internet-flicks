import { useContext } from "react";
import Context from "@/context/Context";
import styles from "@/styles/CloseBtn.module.scss";

const CloseBtn = ({ closeHandler = () => setModalOpen(false) }) => {
  const { setModalOpen } = useContext(Context);
  return <button className={styles.btn} onClick={closeHandler} />;
};

export default CloseBtn;
