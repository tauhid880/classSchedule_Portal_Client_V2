import { createContext } from "react";

export const DeadlineContext = createContext();
const DeadlineProvider = ({ children }) => {
  const value = {};
  return (
    <DeadlineContext.Provider value={value}>
      {children}
    </DeadlineContext.Provider>
  );
};

export default DeadlineProvider;
