import Nav from "@/components/Nav";
// Obeserver
import { useInView } from "react-intersection-observer";

const Layout = ({ children }) => {
  const [element, inView] = useInView();

  return (
    <>
      <div ref={element} style={{ height: "1px" }}></div>
      <Nav inView={inView} />
      {children}
    </>
  );
};

export default Layout;
