import { createContext, useState } from "react";
import { useUser } from "../hooks/useQueries";
import Cookies from "js-cookie";
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("accessToken") === undefined ? false : true
  );

  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

  const { data: user } = useUser(accessToken);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, setIsLoggedIn, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
