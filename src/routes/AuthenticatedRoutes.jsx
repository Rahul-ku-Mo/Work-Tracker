import React from "react";
import { Outlet } from "react-router-dom";

import { SidebarContextProvider } from "../Context/SidebarContext";
import { CardContextProvider } from "../Context/CardContext";

const AuthenticatedRoutes = () => {

    
  return (
    <SidebarContextProvider>
      <CardContextProvider>
        <Outlet />
      </CardContextProvider>
    </SidebarContextProvider>
  );
};

export default AuthenticatedRoutes;
