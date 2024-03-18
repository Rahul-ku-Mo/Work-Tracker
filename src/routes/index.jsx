import { useRoutes, Navigate } from "react-router-dom";
import {
  LandingPage,
  KanbanPage,
  AuthPage,
  AccountPage,
  BoardPage,
  NotFoundPage,
} from "./element";
import { useContext } from "react";

import { KanbanContextProvider } from "../Context/KanbanContext";
import { AuthContext } from "../Context/AuthContext";

const Router = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return useRoutes([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/kanban/:id",
      element: isLoggedIn ? (
        <KanbanContextProvider>
          <KanbanPage />
        </KanbanContextProvider>
      ) : (
        <Navigate to="/auth" replace />
      ),
    },
    {
      path: "/boards",
      element: isLoggedIn ? <BoardPage /> : <Navigate to="/auth" replace />,
    },
    {
      path: "/auth",
      element: isLoggedIn ? <Navigate to="/boards" replace /> : <AuthPage />,
    },
    {
      path: "/profile",
      element: isLoggedIn ? <AccountPage /> : <Navigate to="/auth" replace />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
};

export default Router;
