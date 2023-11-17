import { useRoutes } from "react-router-dom";
import { LandingPage, DashboardPage } from "./element";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/dashboard",
      element: <DashboardPage />,
    },
  ]);
};

export default Router;
