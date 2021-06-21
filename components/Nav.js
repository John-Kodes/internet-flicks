// background transition to dark grey when scroll added
// styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Nav = () => {
  return (
    <StyledNav>
      <h1>NAV BB</h1>
    </StyledNav>
  );
};
const StyledNav = styled(motion.div)`
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0)
  );
`;

export default Nav;
