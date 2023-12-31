
import { Suspense, lazy } from "react";
import LoadingScreen from "../components/LoadingScreen.jsx";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );


export const LandingPage = Loadable(lazy(() => import('../pages/LandingPage.jsx')))
export const DashboardPage = Loadable(lazy(() => import('../pages/Dashboard.jsx')))
export const AuthPage = Loadable(lazy(() => import('../pages/AuthPage.jsx')))
