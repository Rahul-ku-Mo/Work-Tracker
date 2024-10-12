import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { LogOut, CreditCard, User as UserIcon } from "lucide-react";
import Placeholder from "../../assets/placeholder.png";
import { Popover, Transition } from "@headlessui/react";

const User = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { setIsLoggedIn } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const logOut = () => {
    Cookies.remove("accessToken");
    setIsLoggedIn(false);
    queryClient.clear();
    navigate("/auth");
  };

  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center space-x-2 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-full p-1 border-2 border-emerald-500">
        {user?.imageUrl ? (
          <img
            src={user?.imageUrl}
            alt="User"
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          <div className="w-6 h-6 text-sm font-bold flex items-center justify-center  ">
            {user?.name?.slice(0, 2).toUpperCase()}
          </div>
        )}
      </Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        {" "}
        <Popover.Panel className="absolute right-4 mt-3 p-2 w-max bg-white dark:bg-zinc-900 rounded-md shadow-lg z-10">
          <a
            href="/profile"
            className="block pr-4 pl-2 py-2 text-sm text-zinc-700 rounded-md transition-all ease-in  dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
          >
            <UserIcon className="inline-block w-4 h-4 mr-2" />
            Account
          </a>

          <a
            href="/pricing"
            className="block pr-4 pl-2 py-2 text-sm text-zinc-700 rounded-md transition-all ease-in  dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
          >
            <CreditCard className="inline-block w-4 h-4 mr-2" />
            Pricing Plans
          </a>
          <button
            onClick={logOut}
            className="block w-full text-left pr-4 pl-2 py-2 text-sm text-zinc-700 rounded-md transition-all ease-in  dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
          >
            <LogOut className="inline-block w-4 h-4 mr-2" />
            Logout
          </button>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default User;
