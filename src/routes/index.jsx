import { useRoutes, Navigate } from "react-router-dom";
import {
  LandingPage,
  KanbanPage,
  AuthPage,
  AccountPage,
  BoardPage,
  NotFoundPage,
  OrganizationPage,
  OrganizationManagementPage,
} from "./element";
import { useContext } from "react";

import { KanbanContextProvider } from "../Context/KanbanContext";
import { AuthContext } from "../Context/AuthContext";
import { UserContextProvider } from "../Context/UserContext";
import { NotificationContextProvider } from "../Context/NotificationContext";

const withUserContext = (Component) => {
  return (props) => (
    <UserContextProvider>
      <NotificationContextProvider>
        <Component {...props} />
      </NotificationContextProvider>
    </UserContextProvider>
  );
};

const withUserAndKanbanContext = (Component) => {
  return (props) => (
    <UserContextProvider>
      <NotificationContextProvider>
        <KanbanContextProvider>
          <Component {...props} />
        </KanbanContextProvider>
      </NotificationContextProvider>
    </UserContextProvider>
  );
};

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
        withUserAndKanbanContext(KanbanPage)()
      ) : (
        <Navigate to="/auth" replace />
      ),
    },
    {
      path: "/boards",
      element: isLoggedIn ? (
        withUserContext(BoardPage)()
      ) : (
        <Navigate to="/auth" replace />
      ),
    },
    {
      path: "/auth",
      element: isLoggedIn ? <Navigate to="/boards" replace /> : <AuthPage />,
    },
    {
      path: "/profile",
      element: isLoggedIn ? (
        withUserContext(AccountPage)()
      ) : (
        <Navigate to="/auth" replace />
      ),
    },
    {
      path: "/organization",
      element: isLoggedIn ? (
        withUserContext(OrganizationPage)()
      ) : (
        <Navigate to="/auth" replace />
      ),
    },
    {
      path: "/organization/:organizationId",
      element: isLoggedIn ? (
        withUserContext(OrganizationManagementPage)()
      ) : (
        <Navigate to="/auth" replace />
      ),
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
};

export default Router;
