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

  // Grant Permission
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
      `https://www.themoviedb.org/authenticate/${tempToken}?redirect_to=${NEXT_URL}/account/approved`,
      "_self"
    );
  };

  // login
  const login = async () => {
    // getting token
    const tokenRes = await fetch(
      `${TMDB_API}/authentication/token/new${API_KEY}`
    );
    const tokenObject = await tokenRes.json();

    const tempToken = tokenObject.request_token;
    console.log(tempToken);

    ///// Ask permission

    // After permission granted
    const sessionRes = await fetch(
      `${TMDB_API}/authentication/session/new${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_token: tempToken,
        }),
      }
    );

    const sessionObj = await sessionRes.json();

    if (sessionObj.session_id) {
      console.log("%c success", "color: lime;", sessionObj.session_id);
      setSessionId(sessionObj.session_id);
    } else {
      console.log(sessionObj);
    }
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

// ////////////////////////////////////////////////////////////////////////
// let token = "";
// // create request token
// const reqToken = async () => {
//   const res = await fetch(`${TMDB_API}/authentication/token/new${API_KEY}`);
//   const tokenObject = await res.json();

//   token = tokenObject.request_token;
// };

// reqToken();

// // Asking user for permission to use their account in your website
// const askPermission = async () => {
//   if (!window) return;

//   const url = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${NEXT_URL}/account/approved`;

//   window.open(url, "_blank");
// };

// // creating session ID (be careful with URLs)

// const createSessionId = async () => {
//   const res = await fetch(
//     `${TMDB_API}/authentication/session/new${API_KEY}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         request_token: token,
//       }),
//     }
//   );

//   const sessionId = await res.json();

//   if (sessionId.session_id) {
//     console.log("%c success", "color: lime;", sessionId.session_id);
//     return sessionId.session_id;
//   } else {
//     console.log(sessionId);
//   }
// };
