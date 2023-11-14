import React from "react";
import "./navbar.css";
import NavbarButton from "../shared/Button/Button";
import {
  faLock,
  faBolt,
  faRocket,
  faBarsProgress,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

import Users from "../shared/User";
const Navbar = () => {
  return (
    <div className="flex text-lg   justify-between font-bold text-white items-center mt-2 bg-transparent">
      <div className="flex justify-between flex-1">
        <div className="flex items-center">
          <div className="ml-2 px-2">Work Tracker</div>
          <div className="px-2 border-x-2 hidden md:block">
            <NavbarButton icon={faLock} btnInput={"Private"} />
          </div>
          <div className="px-2 hidden md:block">
            <NavbarButton icon={faClipboardList} btnInput={"Board"} />
          </div>
        </div>
        <div className="md:flex mr-2 items-center hidden md:justify-end">
          <div>
            <NavbarButton icon={faBolt} btnInput={"Automation"} />
          </div>
          <div className="px-2 ">
            <NavbarButton icon={faRocket} btnInput={"Power-Ups"} />
          </div>
          <div className="px-2 border-x-2">
            <NavbarButton icon={faBarsProgress} btnInput={"Filters"} />
          </div>
        </div>
      </div>
      <div className="mx-2">
        <Users />
      </div>
    </div>
  );
};

export default Navbar;
