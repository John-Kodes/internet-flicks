import { useContext } from "react";
import Image from "next/dist/client/image";
// Context
import Context from "@/context/Context";
// Images
import ArrowIcon from "@/images/ArrowIcon.svg";
// Styles
import styles from "@/styles/BackBtn.module.scss";

const BackBtn = () => {
  const { setModalOpen } = useContext(Context);
  return (
    <button className={styles.btn}>
      {/* <Image src={ArrowIcon} layout="fill" objectFit="contain" /> */}
    </button>
  );
};

export default BackBtn;
