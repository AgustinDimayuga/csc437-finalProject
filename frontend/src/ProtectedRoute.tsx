import { Navigate } from "react-router";
import { VALID_ROUTES } from "./shared/ValidRoutes.js";

interface ProtectedRouteProps {
  authToken: string;
  children: React.ReactNode;
}

export function ProtectedRoute({ authToken, children }: ProtectedRouteProps) {
  if (!authToken) {
    return <Navigate to={VALID_ROUTES.SIGNIN} replace />;
  }
  return children;
}
