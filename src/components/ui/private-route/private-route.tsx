import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import routes from "@/navigation/routes";

interface PropType {
  children: JSX.Element;
}

const PrivateRoute: FC<PropType> = ({ children }) => {
  const { user } = useAuth();
  const isAuthenticated = Boolean(user);
  const location = useLocation();
  return !isAuthenticated ? (
    <Navigate replace to={routes.LOGIN} state={{ from: location }} />
  ) : (
    children
  );
};

export default PrivateRoute;
