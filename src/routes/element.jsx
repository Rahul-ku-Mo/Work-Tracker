
import { Suspense, lazy } from "react";
import LoadingScreen from "../components/LoadingScreen.jsx";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );


export const LandingPage = Loadable(lazy(() => import('../pages/LandingPage.jsx')))
export const KanbanPage = Loadable(lazy(() => import('../pages/KanbanPage.jsx')))
export const AuthPage = Loadable(lazy(() => import('../pages/AuthPage.jsx')))
export const AccountPage = Loadable(lazy(() => import('../pages/AccountPage.jsx')))
export const BoardPage = Loadable(lazy(() => import('../pages/BoardPage.jsx')));
export const NotFoundPage = Loadable(lazy(() => import('../pages/NotFoundPage.jsx')));