import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";

const User = () => {
  const { user } = useContext(AuthContext);

  return (
    <Link
      to="/profile"
      className="bg-black text-slate-100 text-sm rounded-full flex justify-center items-center w-8 h-8"
    >
      <img
        loading="lazy"
        src={user?.imageUrl}
        alt="user"
        className="w-full h-full rounded-full"
      />
    </Link>
  );
};

export default User;
