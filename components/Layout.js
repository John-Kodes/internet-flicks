import { useContext, useEffect, useState } from "react";
// Components
import Nav from "@/components/Nav";
import MagicBtn from "@/components/MagicBtn";
// Context
import ContextProvider from "context/Context";
// Obeserver
import { useInView } from "react-intersection-observer";

const Layout = ({ children }) => {
  const [element, inView] = useInView();
  const { modalOpen } = useContext(ContextProvider);

  useEffect(() => {
    if (document)
      document.body.style.overflowY = modalOpen ? "hidden" : "scroll";
  }, [modalOpen]);

  return (
    <>
      <div ref={element} style={{ height: "0.1px" }} />
      <MagicBtn />
      <Nav inView={inView} />
      {children}
    </>
  );
};

export default Layout;
