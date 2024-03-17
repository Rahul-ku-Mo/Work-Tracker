import {
  faUser,
  faTableColumns,
  faDoorOpen,
  faMoneyBill,
  faAngleRight,
  faAngleLeft,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { useSidebarContext } from "../../Context/SidebarContext";

const SidebarItem = ({ icon, text, active }) => {
  return (
    <li>
      <Link
        to={`/${text}`}
        className={clsx(
          active
            ? "text-slate-100 bg-emerald-800 hover:bg-emerald-700"
            : "text-black hover:bg-slate-600",
          "flex gap-2 cursor-pointer group mx-2 my-0.5 hover:text-white items-center rounded-lg transition-all ease-in-out duration-300 px-2 py-3"
        )}
      >
        <FontAwesomeIcon icon={icon} className=" w-5 h-5" />
        <span className="text-sm capitalize tracking-wide font-medium">
          {text}
        </span>
      </Link>
    </li>
  );
};

const ITEMS = [
  { icon: faUser, text: "profile", id: "pf" },
  { icon: faMoneyBill, text: "pricing", id: "pi" },
  { icon: faClipboardList, text: "boards", id: "bd" },
  { icon: faDoorOpen, text: "logout", id: "lo" },
];

const Sidebar = () => {
  const { isOpen, openSidebar, closeSidebar } = useSidebarContext();

  const SidebarClass = clsx(
    isOpen ? "translate-x-0 " : "-translate-x-full",
    "bg-white text-slate-800 fixed h-screen transition-transform border-slate-500 top-0 left-0 z-20 border-r border-dashed w-64"
  );

  const { pathname } = useLocation();

  return (
    <aside className={SidebarClass}>
      <div
        onClick={isOpen ? closeSidebar : openSidebar}
        className="absolute w-2 h-2 p-2.5 rounded-full bg-white -right-2.5 z-20 border-dashed border cursor-pointer hover:scale-95 transition-transform border-black top-10"
      >
        {isOpen ? (
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <FontAwesomeIcon
            icon={faAngleRight}
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>
      <nav className="flex flex-col justify-between h-full">
        <div>
          <h1 className="font-extrabold text-xl relative text-black tracking-tighter p-3">
            Work<span className="text-emerald-500">Tracker</span>
          </h1>
          <h1 className="text-xs uppercase font-bold pt-1 tracking-tight p-2 cursor-pointer inline-block">
            overview
          </h1>
          <ol className="list-none flex flex-col">
            {ITEMS.map((item) => {
              return (
                <SidebarItem
                  key={item.id}
                  icon={item.icon}
                  text={item.text}
                  active={pathname.split("/")[1] === item.text}
                />
              );
            })}
          </ol>
        </div>

        <h1 className="font-bold text-xl text-white tracking-tighter pb-2 mx-auto flex flex-col">
          <span className="text-black">
            Work<span className="text-emerald-500">Tracker</span>
          </span>
          <span className="text-xs font-thin text-center tracking-normal text-black">
            Made by Rahul K.M 😏
          </span>
        </h1>
      </nav>
    </aside>
  );
};

export default Sidebar;
