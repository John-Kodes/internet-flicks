import { useContext, useEffect } from "react";
import Head from "next/dist/next-server/lib/head";
// Components
import PageLoader from "@/components/PageLoader";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import NavDecor from "@/components/NavDecor";
// Context
import ContextProvider from "@/context/Context";
// Obeserver
import { useInView } from "react-intersection-observer";

const desc =
  "Internet Flicks is a user editable database for movies and TV shows using the TMDb API";

const Layout = ({
  children,
  title = "Internet Flicks",
  description = desc,
  useNav = true,
  useFooter = true,
  category,
}) => {
  const [element, inView] = useInView();
  const { modalOpen } = useContext(ContextProvider);

  useEffect(() => {
    if (!document) return;
    document.body.style.overflowY = modalOpen ? "hidden" : "scroll";
  }, [modalOpen]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div ref={element} style={{ height: "0.1px" }} />
      <PageLoader />
      {useNav ? <Nav inView={inView} category={category} /> : <NavDecor />}
      {children}
      {useFooter && <Footer />}
    </>
  );
};

export default Layout;
