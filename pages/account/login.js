// React and Next
import { useState, useEffect, useContext } from "react";
import Link from "next/dist/client/link";
// Config
import { API_KEY, TMDB_API, NEXT_URL } from "@/config/index";
// Components
import Layout from "@/components/Layout";
// NPM
import { FaUser } from "react-icons/fa";
// Styles
import styles from "@/styles/LoginPage.module.scss";

const LoginPage = () => {
  let token = "";
  // create request token
  const reqToken = async () => {
    const res = await fetch(`${TMDB_API}/authentication/token/new${API_KEY}`);
    const tokenObject = await res.json();

    token = tokenObject.request_token;
  };

  reqToken();

  // Asking user for permission to use their account in your website
  const askPermission = async () => {
    if (!window) return;

    const url = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${NEXT_URL}/account/approved`;

    window.open(url, "_blank");
  };

  // creating session ID (be careful with URLs)

  const createSessionId = async () => {
    const res = await fetch(
      `${TMDB_API}/authentication/session/new${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_token: token,
        }),
      }
    );

    const sessionId = await res.json();
    console.log(token);

    console.log(sessionId);
  };

  return (
    <Layout useNav={false}>
      <button className={styles.test} onClick={askPermission}>
        Test
      </button>
      <button className={styles.test2} onClick={createSessionId}>
        Test2
      </button>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>
            <FaUser /> Login
          </h1>
          <form className={styles.form}>
            <div className={styles.inputBox}>
              <label htmlFor="email" className={styles.label}>
                EMAIL
              </label>
              <input
                className={styles.field}
                type="email"
                name="email"
                id="email"
                placeholder="Helene@email.com"
              />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="password" className={styles.label}>
                PASSWORD
              </label>
              <input
                className={styles.field}
                type="password"
                name="password"
                id="password"
              />
            </div>
            <button className={styles.loginBtn} type="submit">
              LOGIN
            </button>
            <div className={styles.register}>
              Don't have an account?{" "}
              <a
                className={styles.link}
                href="https://www.themoviedb.org/signup"
                target="_blank"
              >
                Register
              </a>
            </div>
            <p className={styles.paragraph}>
              <span>* </span>To register, you'll need to create an account
              through the TMDb official website.
            </p>
            <p className={styles.paragraph}>
              Too lazy? Continue as{" "}
              <Link href="/">
                <a className={styles.link}>Guest</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
