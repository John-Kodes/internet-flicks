import styles from "@/styles/CastProfile.module.scss";

const CastProfile = ({ actor }) => {
  return <div className={styles.container}>{actor?.name || "actor"}</div>;
};

export default CastProfile;
