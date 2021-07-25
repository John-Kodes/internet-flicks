import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
// config
import { NEXT_URL } from "@/config/index";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const router = useRouter();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  // Authentication state
  const [userData, setUserData] = useState(null);

  const createGuestSessionId = async () => {
    const res = await fetch(`${NEXT_URL}/api/guestLogin`);
    const data = await res.json();

    router.push("/browse");
  };

  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (data.id) {
      setUserData(data);
    } else {
      setUserData(null);
    }
  };

  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.success) {
      setUserData(null);
      router.push("/");
    } else {
      console.log(data.message);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

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
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
