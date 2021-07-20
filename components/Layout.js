import { useContext, useEffect } from "react";
import Head from "next/dist/next-server/lib/head";
// Components
import Nav from "@/components/Nav";
// Context
import ContextProvider from "context/Context";
// Obeserver
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";

const desc =
  "Internet Flicks is a user editable database for movies and TV shows using the TMDb API";

const Layout = ({
  children,
  title = "Internet Flicks",
  description = desc,
  useNav = true,
  category,
}) => {
  const [element, inView] = useInView();
  const { modalOpen } = useContext(ContextProvider);

  const router = useRouter();

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
      {useNav && <Nav inView={inView} category={category} />}
      {children}
    </>
  );
};

export default Layout;
