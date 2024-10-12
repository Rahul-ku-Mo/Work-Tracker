import User from "../shared/User";
import NotificationPopover from "../Notification/NotificationPopover";
import { useSidebarContext } from "../../Context/SidebarContext";

const Navbar = () => {

  return (
    <nav className="flex justify-end items-center py-2 px-4 bg-white dark:bg-zinc-900 text-black dark:text-white shadow-md z-20 fixed top-0 w-full">
      <div className="flex items-center space-x-4">
        <NotificationPopover />
        <User />
      </div>
    </nav>
  );
};

export default Navbar;
