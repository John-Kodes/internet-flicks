import { createContext, useEffect, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => console.log(modalData));

  return (
    <Context.Provider
      value={{ modalOpen, setModalOpen, modalData, setModalData }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
