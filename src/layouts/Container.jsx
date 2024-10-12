import React from "react";
import Sidebar from "../components/Sidebar";
import clsx from "clsx";
import { useSidebarContext } from "../Context/SidebarContext";
import Navbar from "../components/Navbar";
const Container = ({ background, children, fwdClassName }) => {
  const { isOpen } = useSidebarContext();

  return (
    <>
      <Sidebar />
      <Navbar />
      <main
        className={clsx(
          isOpen ? "ml-[16rem]" : "ml-16 pl-2",
          "pt-12 relative h-screen transition overflow-auto",
          background,
          fwdClassName
        )}
      >
        {children}
      </main>
    </>
  );
};

export default Container;
