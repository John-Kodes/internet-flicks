import Image from "next/dist/client/image";
import styles from "@/styles/RoundBtn.module.scss";

const RoundBtn = ({ btnHandler, icon }) => {
  return (
    <button className={styles.btn} onClick={btnHandler}>
      {icon && (
        <div className={styles.svg}>
          <Image src={icon} layout="fill" />
        </div>
      )}
    </button>
  );
};

export default RoundBtn;
