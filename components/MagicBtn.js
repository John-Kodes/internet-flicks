import Context from "@/context/Context";
import styles from "@/styles/MagicBtn.module.scss";
import { useContext } from "react";

const MagicBtn = () => {
  const { modalOpen, setModalOpen } = useContext(Context);
  return (
    <button className={styles.btn} onClick={() => setModalOpen(!modalOpen)} />
  );
};

export default MagicBtn;
