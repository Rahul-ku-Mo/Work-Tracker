import NavbarButton from "../shared/Button/Button";
import {
  faLock,
  faBolt,
  faBell,
  faRocket,
  faBarsProgress,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

import Users from "../shared/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  return (
    <nav className="flex text-lg justify-between font-semibold text-white items-center py-2 bg-white  backdrop-blur-md z-20 fixed top-0 w-full">
      <div className="flex justify-between flex-1">
        <div className="flex items-center">
          <div className="ml-2 px-2">
            <h1 className="font-extrabold text-xl relative text-black tracking-tighter">
              Work<span className="text-emerald-500">Tracker</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="mx-2 flex items-center gap-4">
        <FontAwesomeIcon
          icon={faBell}
          className="h-4 w-4 bg-slate-600/20 cursor-pointer p-2 rounded-full border hover:border-dashed hover:border-black/30 border-black/30 transition-all text-black"
        />
        <Users />
      </div>
    </nav>
  );
};

export default Navbar;
