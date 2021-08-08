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
  // Modal history
  const [modalHistory, setModalHistory] = useState([]);
  // Authentication state
  const [userData, setUserData] = useState(null);
  // vw related
  const [sliderCap, setSliderCap] = useState(6);

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
    // persisting login
    checkUserLoggedIn();
  }, []);

  // updating viewport
  useEffect(() => {
    // getting and setting the vw
    const vw = Math.max(
      document?.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );

    if (vw === 0) return;
    if (vw < 500) return setSliderCap(2);
    if (vw < 784) return setSliderCap(3);
    if (vw < 1024) return setSliderCap(4);
    if (vw < 1100) return setSliderCap(5);
    if (vw > 1100) return setSliderCap(6);
  });

  return (
    <Context.Provider
      value={{
        // Modal
        modalOpen,
        setModalOpen,
        modalData,
        setModalData,
        modalHistory,
        setModalHistory,
        // vw related
        sliderCap,
        setSliderCap,
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
