import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Button = ({ btnInput, icon }) => {
  return (
    <div className="text-base inline-flex items-center rounded-lg transition-all ease-in-out duration-500 hover:bg-transparent w-full bg-zinc-800 p-2 cursor-not-allowed ">
      {icon && <FontAwesomeIcon icon={icon} className="pr-2" />}
      {btnInput}
    </div>
  );
};

export default Button;
