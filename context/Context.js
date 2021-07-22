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
  const [token, setToken] = useState("");
  const [sessionId, setSessionId] = useState("");

  const createGuestSessionId = async () => {
    const res = await fetch(
      `${TMDB_API}/authentication/guest_session/new${API_KEY}`
    );
    const sessionObj = await res.json();
    setSessionId(sessionObj.guest_session_id);
    console.log(sessionId);
    router.push("/browse");
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
