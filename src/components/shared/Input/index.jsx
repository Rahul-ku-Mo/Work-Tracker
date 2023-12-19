import { useState } from "react";

import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const Input = ({ value, type, onHandleChange, placeholder, isPassword }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="flex items-center relative">
      {isPassword ? (
        <input
          placeholder={placeholder}
          className={clsx(
            "flex w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none",
            "focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500",
            "disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none",
            " invalid:border-pink-500 invalid:text-pink-600",
            "focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ",
            isPassword && "pr-8"
          )}
          value={value}
          type={isPasswordVisible ? "text" : "password"}
          onChange={onHandleChange}
        />
      ) : (
        <input
          placeholder={placeholder}
          className={clsx(
            "flex w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none",
            "focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500",
            "disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none",
            " invalid:border-pink-500 invalid:text-pink-600",
            "focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ",
            isPassword && "pr-8"
          )}
          value={value}
          type={!isPassword ? type : "password"}
          onChange={onHandleChange}
        />
      )}

      {isPassword && (
        <div
          className="absolute right-3 cursor-pointer z-20"
          onClick={() => {
            setIsPasswordVisible((prev) => !prev);
          }}
        >
          {!isPasswordVisible ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
