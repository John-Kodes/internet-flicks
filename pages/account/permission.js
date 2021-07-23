// React and Next
import { useState, useEffect, useContext } from "react";
import Link from "next/dist/client/link";
// Context
import Context from "@/context/Context";
// Config
import { API_KEY, TMDB_API, NEXT_URL } from "@/config/index";
// Components
import Layout from "@/components/Layout";
// NPM
import { FaUser } from "react-icons/fa";
// Styles
import styles from "@/styles/LoginPage.module.scss";

const LoginPage = () => {
  const [sessionId, setSessionId] = useState("");
  const { createGuestSessionId } = useContext(Context);

  // Continue as Guest
  const Guesthandler = () => {
    createGuestSessionId();
  };

  // Grant Permission and redirect to log in page
  const askPermission = async () => {
    if (!window) return;
    // getting token
    const tokenRes = await fetch(
      `${TMDB_API}/authentication/token/new${API_KEY}`
    );
    const tokenObject = await tokenRes.json();

    const tempToken = tokenObject.request_token;
    console.log(tempToken);

    // redirect user to approve token and login
    window.open(
      `https://www.themoviedb.org/authenticate/${tempToken}?redirect_to=${NEXT_URL}/account/login
      `,
      "_self"
    );
  };

  return (
    <Layout useNav={false}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Just a heads up</h2>
          <p>
            To login or create a new account, you have to do it through the
            official TMDb website which will also grant Internet Flicks
            permission to use your account. Doing so will allow you to rate
            movies, create personal lists, etc. within Internet Flicks.
          </p>

          <button className={styles.btn} onClick={askPermission}>
            Grant permission
          </button>

          <p>
            If you're too lazy to do all that, you can simply continue as{" "}
            <a onClick={Guesthandler}>Guest</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
