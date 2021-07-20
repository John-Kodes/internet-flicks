import styles from "@/styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Visit my portfolio{" "}
        <a
          href="https://johndaniel.netlify.app/"
          target="_blank"
          className={styles.link}
        >
          website
        </a>
      </p>
      <p>&copy; 2021 by John Daniel Semine.</p>
      <p>Made with the TMDb API.</p>
    </footer>
  );
};

export default Footer;
