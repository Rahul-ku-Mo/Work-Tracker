import { createContext, useState, useEffect } from "react";
import { useUser } from "../hooks/useQueries";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("accessToken") === undefined ? false : true
  );

  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

  const { data: user } = useUser(accessToken);

  useEffect(() => {
    if (!accessToken || accessToken === undefined) {
      setIsLoggedIn(false);

      navigate("/auth");
    }
  }, [accessToken, navigate]);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, setIsLoggedIn, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
