import { createContext, useState } from "react";

export const CardContext = createContext();

export const CardContextProvider = ({ children }) => {
  const [activeLabelGroups, setActiveLabelGroups] = useState(true);

  return (
    <CardContext.Provider
      value={{
        activeLabelGroups,
        setActiveLabelGroups,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
