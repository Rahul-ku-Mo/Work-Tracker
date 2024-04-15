import { createContext, useState, useEffect } from "react";
import { useUser } from "../hooks/useQueries";
import Cookies from "js-cookie";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const accessToken = Cookies.get("accessToken");

  const { data: user, isPending } = useUser(accessToken);

  return (
    <UserContext.Provider
      value={{
        user,
        isPending,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
