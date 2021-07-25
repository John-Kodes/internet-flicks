import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
// config
import { NEXT_URL } from "@/config/index";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  // Authentication
  const [userData, setUserData] = useState({});

  const createGuestSessionId = async () => {
    const res = await fetch(`${NEXT_URL}/api/guestLogin`);
    const data = await res.json();

    router.push("/browse");
  };

  useEffect(() => console.log(userData));

  return (
    <Context.Provider
      value={{
        // Modal
        modalOpen,
        setModalOpen,
        modalData,
        setModalData,
        // Login related
        createGuestSessionId,
        userData,
        setUserData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
