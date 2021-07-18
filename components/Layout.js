import { useContext, useEffect, useState } from "react";
// Components
import Nav from "@/components/Nav";
// Context
import ContextProvider from "context/Context";
// Obeserver
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const [element, inView] = useInView();
  const { modalOpen } = useContext(ContextProvider);

  const router = useRouter();
  const category = router.query.category && router.query.category.split("?")[0]; // for nav category name

  useEffect(() => {
    if (!document) return;
    document.body.style.overflowY = modalOpen ? "hidden" : "scroll";
  }, [modalOpen]);

  return (
    <>
      <div ref={element} style={{ height: "0.1px" }} />
      <Nav inView={inView} category={category} />
      {children}
    </>
  );
};

export default Layout;
