import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
  redirectPath: string;
  isAuthenticated: () => boolean;
}

export const PrivateRoute = (
  {
    children,
    redirectPath,
    isAuthenticated,
  }: PrivateRouteProps,
) => isAuthenticated() ? children : <Navigate to={redirectPath} />;
