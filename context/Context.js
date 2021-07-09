import { createContext, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Context.Provider value={{ modalOpen, setModalOpen }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
