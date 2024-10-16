import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Building2,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Inbox,
  BrainCircuit,
  BarChart,
} from "lucide-react";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useSidebarContext } from "../../Context/SidebarContext";
import { LogoBar } from "../shared/LogoBar";

const SidebarItem = ({ icon: Icon, text, active, onClick, isOpen }) => {
  return (
    <li>
      <Link
        onClick={onClick}
        to={`/${text.toLowerCase()}`}
        className={`
          flex items-center gap-3 cursor-pointer mx-2 my-1 rounded-lg transition-all duration-300 ease-in-out px-3 py-2
          ${
            active
              ? "text-emerald-500 bg-slate-100 dark:text-emerald-500 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700"
              : "text-slate-700 hover:bg-slate-100 hover:text-emerald-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          }
        `}
      >
        <Icon className="w-5 h-5" />
        {isOpen && (
          <span className="text-sm font-medium capitalize">{text}</span>
        )}
      </Link>
    </li>
  );
};

const ITEMS = [
  { icon: BarChart, text: "Analysis", id: "ana" },
  { icon: Building2, text: "organization", id: "org" },
  { icon: Inbox, text: "conversation", id: "conv" },
  { icon: ClipboardList, text: "boards", id: "bd" },
  { icon: BrainCircuit, text: "Generative AI", id: "genAi" },
];

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebarContext();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/auth");
    queryClient.clear();
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 z-30 h-screen bg-white dark:bg-zinc-900 text-slate-900 dark:text-white transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-16"}
      `}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          {isOpen && (
            <LogoBar />
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors duration-200"
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
        <nav className="flex-grow overflow-y-auto">
          {isOpen && (
            <h2 className="text-xs uppercase font-bold tracking-wider px-5 py-3 text-slate-500 dark:text-zinc-500">
              Overview
            </h2>
          )}
          <ol className="list-none flex flex-col">
            {ITEMS.map((item) => {
              return (
                <SidebarItem
                  isOpen={isOpen}
                  key={item.id}
                  icon={item.icon}
                  text={item.text}
                  active={pathname.split("/")[1] === item.text}
                />
              );
            })}
          </ol>
        </nav>
        {isOpen && (
          <div className="p-4 text-center">
          
            {/* <button
              onClick={toggleDarkMode}
              className="mt-2 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors duration-200"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button> */}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
