import { Suspense, lazy } from "react";
import LoadingScreen from "../components/LoadingScreen.jsx";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

export const LandingPage = Loadable(
  lazy(() => import("../pages/LandingPage.jsx"))
);
export const KanbanPage = Loadable(
  lazy(() => import("../pages/KanbanPage.jsx"))
);
export const AuthPage = Loadable(lazy(() => import("../pages/AuthPage.jsx")));
export const AccountPage = Loadable(
  lazy(() => import("../pages/AccountPage.jsx"))
);
export const BoardPage = Loadable(lazy(() => import("../pages/BoardPage.jsx")));
export const NotFoundPage = Loadable(
  lazy(() => import("../pages/NotFoundPage.jsx"))
);
export const OrganizationPage = Loadable(
  lazy(() => import("../pages/OrganizationPage.jsx"))
);
export const OrganizationManagementPage = Loadable(
  lazy(() => import("../pages/Organization[orgId].jsx"))
);

export const ConversationPage = Loadable(
  lazy(() => import("../pages/ConversationPage.jsx"))
);

export const ProfileForm = Loadable(
  lazy(() => import("../components/Account/ProfileForm.jsx"))
);

export const AccountForm = Loadable(
  lazy(() => import("../components/Account/AccountForm.jsx"))
);

export const LocationForm = Loadable(
  lazy(() => import("../components/Account/LocationForm.jsx"))
);

export const RoleForm = Loadable(
  lazy(() => import("../components/Account/RoleForm.jsx"))
);

export const IntegrationsForm = Loadable(
  lazy(() => import("../components/Account/IntegrationsForm.jsx"))
);
