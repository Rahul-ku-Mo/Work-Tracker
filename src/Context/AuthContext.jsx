import { createContext, useEffect, useState } from "react";

import { auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(auth?.currentUser);
      }
    });

    if (user) {
      Cookies.set("accessToken", auth?.currentUser?.accessToken, {
        expires: 7,
      });
    }
  }, [user, auth?.currentUser?.accessToken]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
