import React from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Placeholder from "../../assets/placeholder.png";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { UserContext } from "../../Context/UserContext";

const User = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const { setIsLoggedIn, setAccessToken } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const logOut = () => {
    Cookies.remove("accessToken");

    setIsLoggedIn(false);

    setAccessToken(null);

    queryClient.clear();

    navigate("/auth");
  };

  return (
    <div
      onClick={logOut}
      className="bg-black text-slate-100 text-sm rounded-full flex justify-center items-center w-8 h-8 cursor-pointer"
    >
      <img
        loading="lazy"
        src={user?.imageUrl || Placeholder}
        alt="user"
        className="w-full h-full rounded-full object-contain"
      />
    </div>
  );
};

export default User;
