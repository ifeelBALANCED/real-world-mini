import { lazy } from "react";
import { Route } from "react-router";

import routes from "../routes";

const SignUpPage = lazy(() => import("@/components/screens/sign-up/sign-up"));
const LoginPage = lazy(() => import("@/components/screens/login/login"));

export const authRoutes = [
  <Route key={routes.SIGN_UP} path={routes.SIGN_UP} element={<SignUpPage />} />,
  <Route key={routes.LOGIN} path={routes.LOGIN} element={<LoginPage />} />,
];
