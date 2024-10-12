import { useContext, createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const SidebarContext = createContext();

export const SidebarContextProvider = ({ children }) => {
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(prev => !prev)

  useEffect(() => {
    setIsOpen(
      pathname.startsWith("/kanban") || pathname.startsWith("/organization")
        ? false
        : true
    );
  }, [pathname]);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
       toggleSidebar
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
