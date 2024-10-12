import React from "react";
import Sidebar from "../components/Sidebar";
import clsx from "clsx";
import { useSidebarContext } from "../Context/SidebarContext";
import Navbar from "../components/Navbar";
const Container = ({ background, children }) => {
  const { isOpen } = useSidebarContext();

  return (
    <>
      <Sidebar />
      <Navbar/>
      <main
        className={clsx(
          isOpen ? "ml-[16.5rem]" : "ml-16 pl-2",
          "pt-12 pr-1 relative h-screen transition overflow-auto",
          background
        )}
      >
        {children}
      </main>
    </>
  );
};

export default Container;
