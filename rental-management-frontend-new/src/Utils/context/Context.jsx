import { createContext, useState } from "react";

export const Context = createContext({});
const MasterContext = ({ children }) => {
  const [firebaseToken, setFirebaseToken] = useState("");

  return (
    <Context.Provider value={{ firebaseToken, setFirebaseToken }}>{children}</Context.Provider>
  );
};
export default MasterContext;
