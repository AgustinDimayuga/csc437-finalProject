import React from "react";
import { Navigate } from "react-router";

export function ProtectedRoute(props: any) {
  if (!props.authToken) {
    return <Navigate to="/login" replace />;
  }

  return props.children;
}
