import styles from "@/styles/Footer.module.scss";
import { PORTFOLIO_URL } from "@/config/index";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Visit my portfolio{" "}
        <a href={PORTFOLIO_URL} target="_blank" className={styles.link}>
          website
        </a>
      </p>
      <p className={styles.copyright}>
        &copy; 2021 Internet Flicks by John Daniel Semine
      </p>
      <p>Made with the TMDb API</p>
    </footer>
  );
};

export default Footer;
