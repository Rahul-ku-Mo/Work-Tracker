import { createContext, useState, useEffect } from "react";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("accessToken") === undefined ? false : true
  );

  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

  useEffect(() => {
    const validateAndSetToken = () => {
      const token = Cookies.get("accessToken");

      if (token) {
        setAccessToken(token);
        setIsLoggedIn(true);
      } else {
        navigate("/auth");
      }
    };

    if (!accessToken) {
      validateAndSetToken();
    }
  }, [accessToken, navigate]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
