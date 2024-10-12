import { useRoutes, Navigate } from "react-router-dom";
import { useContext } from "react";
import {
  LandingPage,
  KanbanPage,
  AuthPage,
  AccountPage,
  BoardPage,
  NotFoundPage,
  OrganizationPage,
  OrganizationManagementPage,
  ConversationPage
} from "./element";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import { KanbanContextProvider } from "../Context/KanbanContext";
import { UserContextProvider } from "../Context/UserContext";
import { NotificationContextProvider } from "../Context/NotificationContext";
import { AuthContext, AuthContextProvider } from "../Context/AuthContext";

const withContexts =
  (Component, includeKanban = false) =>
  (props) =>
    (
      <UserContextProvider>
        <NotificationContextProvider>
          {includeKanban ? (
            <KanbanContextProvider>
              <Component {...props} />
            </KanbanContextProvider>
          ) : (
            <Component {...props} />
          )}
        </NotificationContextProvider>
      </UserContextProvider>
    );

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/auth" replace />;
};

const AuthRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Navigate to="/boards" replace /> : children;
};

const Router = () => {
  return useRoutes([
    { path: "/", element: <LandingPage /> },
    {
      path: "/auth",
      element: (
        <AuthContextProvider>
          <AuthRoute>
            <AuthPage />
          </AuthRoute>
        </AuthContextProvider>
      ),
    },
    {
      element: (
        <AuthContextProvider>
          <ProtectedRoute>
            <AuthenticatedRoutes />
          </ProtectedRoute>
        </AuthContextProvider>
      ),
      children: [
        { path: "/kanban/:id", element: withContexts(KanbanPage, true)() },
        { path: "/boards", element: withContexts(BoardPage)() },
        { path: "/profile", element: withContexts(AccountPage)() },
        { path: "/organization", element: withContexts(OrganizationPage)() },
        {
          path: "/organization/:organizationId",
          element: withContexts(OrganizationManagementPage)(),
        },
        {
          path: "/conversation",
          element: withContexts(ConversationPage)(),
        },
      ],
    },
    { path: "*", element: <NotFoundPage /> },
  ]);
};

export default Router;
