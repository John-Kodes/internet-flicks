import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
// config
import { API_KEY, TMDB_API } from "@/config/index";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  // Authentication
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [sessionId, setSessionId] = useState("");

  const checkUserLoggedIn = () => {};

  const createGuestSessionId = async () => {
    const res = await fetch(
      `${TMDB_API}/authentication/guest_session/new${API_KEY}`
    );
    const sessionObj = await res.json();
    setSessionId(sessionObj.guest_session_id);
    console.log(sessionId);
    router.push("/browse");
  };

  const createUserSessionId = async (token) => {
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

    const sessionObj = await res.json();

    if (sessionObj.session_id) {
      console.log("%c success", "color: lime;", sessionObj.session_id);
      setSessionId(sessionObj.session_id);
      setUserLoggedIn(true);
    } else {
      console.log(sessionObj);
    }
  };

  return (
    <Context.Provider
      value={{
        modalOpen,
        setModalOpen,
        modalData,
        setModalData,
        token,
        setToken,
        sessionId,
        setSessionId,
        createGuestSessionId,
        createUserSessionId,
        userLoggedIn,
        setUserLoggedIn,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
