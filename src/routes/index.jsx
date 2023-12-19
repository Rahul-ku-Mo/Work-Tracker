import { useRoutes, Navigate } from "react-router-dom";
import { LandingPage, DashboardPage, AuthPage } from "./element";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const user = useContext(AuthContext);

  return user ? children : <Navigate to="/auth" />;
};
const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/auth",
      element: <AuthPage />,
    },
  ]);
};

export default Router;
