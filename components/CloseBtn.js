import { useContext } from "react";
import Context from "@/context/Context";
import styles from "@/styles/CloseBtn.module.scss";

const CloseBtn = () => {
  const { setModalOpen } = useContext(Context);
  return <button className={styles.btn} onClick={() => setModalOpen(false)} />;
};

export default CloseBtn;
